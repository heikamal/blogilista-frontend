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
	})
})