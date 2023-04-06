describe('Blog app', function() {
	beforeEach(function() {
		// alusta tietokanta
		cy.request('POST', 'http://localhost:3003/api/testing/reset')

		// luo testikäyttäjä
		const user = {
			name: 'Heikki Malkavaara',
			username: 'heimal',
			password: 'salasana1'
		}

		cy.request('POST', 'http://localhost:3003/api/users/', user)

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
			cy.contains('blogs')
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
		})
	})
})