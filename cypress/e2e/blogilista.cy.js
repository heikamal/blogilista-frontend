describe('Blog app', function() {
	beforeEach(function() {
		// alusta tietokanta
		cy.request('POST', 'http://localhost:3003/api/testing/reset')

		// luo testikäyttäjä
		const user1 = {
			name: 'Heikki Malkavaara',
			username: 'heimal',
			password: 'salasana1'
		}

		const user2 = {
			name: 'Testi Testinen',
			username: 'testes',
			password: 'salasana2'
		}

		cy.request('POST', 'http://localhost:3003/api/users/', user1)
		cy.request('POST', 'http://localhost:3003/api/users/', user2)

		// avaa sivu
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function() {
		cy.contains('log in to application')

		// etsi sivulta formi, jolta löytyy teksti login
		cy.get('form').contains('login')
	})

	describe('Login',function() {
		it('succeeds with correct credentials', function() {
			// hae kentät ja kirjoita niihin tiedot
			cy.get('#username').type('heimal')
			cy.get('#password').type('salasana1')
			// paina painiketta
			cy.get('#login-button').click()
			// tarkista tuleeko oikea ilmoitus
			cy.contains('Heikki Malkavaara logged in')
		})

		it('fails with wrong credentials', function() {
			// hae kentät ja kirjoita niihin tiedot
			cy.get('#username').type('valeheimal')
			cy.get('#password').type('vaarasalasana1')
			// paina painiketta
			cy.get('#login-button').click()
			// tarkista tuleeko oikea ilmoitus
			cy.contains('wrong username or password')
		})
	})

	describe('When logged in', function() {
		beforeEach(function() {
			// log in user here
			cy.login({ username: 'heimal', password: 'salasana1' })
		})

		it('A blog can be created', function() {
			cy.contains('add new').click()
			cy.get('#title').type('TestiBlogi')
			cy.get('#author').type('Matti Meikäläinen')
			cy.get('#url').type('https://google.com/')
			cy.get('#createBlog-button').click()
			cy.contains('a new blog TestiBlogi by Matti Meikäläinen added')
			cy.contains('TestiBlogi Matti Meikäläinen')
		})

		describe('When there is a blog already', function() {
			beforeEach(function() {
				cy.createBlog({
					title: 'JavaScript testing: 9 best practices to learn',
					author: 'Michiel Mulders',
					url: 'https://blog.logrocket.com/javascript-testing-best-practices/'
				})
			})

			it('An existing blog can be liked', function() {
				cy.contains('view').click()
				cy.contains('like').click()
				cy.contains('like added to JavaScript testing: 9 best practices to learn')
			})

			it('A blog can be removed by the added user', function() {
				cy.contains('view').click()
				cy.contains('remove').click()
				cy.contains('JavaScript testing: 9 best practices to learn removed')
			})

			it('Remove button only shows to the user that added the blog', function() {
				// aluksi on blogin lisännyt käyttäjä kirjautunut sisään
				cy.contains('Heikki Malkavaara logged in')

				// näkee poistopainikkeen
				cy.contains('view').click()
				cy.contains('remove')

				// kirjaa käyttäjä ulos
				cy.contains('logout')

				// kirjaudu sisään toisella käyttäjällä
				cy.login({ username: 'testes', password: 'salasana2' })

				// tarkista että toinen käyttäjä on kirjautuneena sisään
				cy.contains('Testi Testinen logged in')

				// tarkista ettei näe poistopainiketta
				cy.contains('view').click()
				cy.get('#remove-button').should('not.exist')
			})
		})

		describe('When there is multiple blogs', function() {
			beforeEach(function() {
				cy.createBlog({
					title: 'The title with the second most likes',
					author: 'Matti Luukkainen',
					url: 'https://fullstackopen.com/osa5/end_to_end_testaus'
				})

				cy.createBlog({
					title: 'The title with the most likes',
					author: 'Matti Luukkainen',
					url: 'https://fullstackopen.com/osa5/end_to_end_testaus'
				})
			})

			it('Blogs are in order of the most likes', function() {

				// koska blogit ollaan lisätty käänteisessä järjestyksessä, haetaan viimeinen painike jolla blogin tiedot laajennetaan
				cy.get('#togglable-button:last').click()

				// annetaan sille muutama tykkäys, annetaan jokaiselle tykkäykselle aikaa näkyä cypressin wait-komennolla
				for (let i = 0; i < 3; i++) {
					cy.get('#like-button').click()
					cy.wait(500)
				}

				// koska nyt kaiken järjen mukaan aiemmin hakemamme painike on siirtynyt, voidaan vain hakea piilotuspainiketta ja painaa siitä
				cy.contains('hide').click()

				// tarkista että blogit ovat oikeassa järjestyksessä
				cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
				cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
			})

		})
	})
})