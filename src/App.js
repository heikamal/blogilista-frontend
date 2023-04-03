import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogDisplay from './components/BlogDisplay'

const App = () => {
	// haetut blogit
	const [blogs, setBlogs] = useState([])

	// uuden blogin tiedot
	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')

	//kirjautuminen
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	// ilmoitus
	const [errorMessage, setErrorMessage] = useState(null)
	const [notiMessage, setNotiMessage] = useState(null)

	// blogien hakeminen
	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)
	}, [])

	// haetaan kirjautunut käyttäjä jos sellaista on
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	// loginin handleri
	const handleLogin = async (event) => {
		event.preventDefault()
		console.log('logging in with', username, password)

		try {
			const user = await loginService.login({
				username, password,
			})

			window.localStorage.setItem(
				'loggedBloglistUser', JSON.stringify(user)
			)

			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setErrorMessage('wrong username or password')
			setUsername('')
			setPassword('')

			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	// logoutin handleri
	const handleLogout = (event) => {
		event.preventDefault()
		console.log('logging out')
		window.localStorage.removeItem('loggedBloglistUser')
		setUser(null)
		blogService.setToken(null)
	}

	const addNewBlog = (event) => {
		event.preventDefault()
		const newBlog = {
			title: newTitle,
			author: newAuthor,
			url: newUrl
		}

		blogService
			.create(newBlog)
			.then(returned => {
				setBlogs(blogs.concat(returned))
				setNotiMessage(`a new blog ${newTitle} by ${newAuthor} added`)
			})
		setNewTitle('')
		setNewAuthor('')
		setNewUrl('')

	}

	return (
		<div>
			{!user && <div>
				<LoginForm
					handleLogin={handleLogin}
					username={username}
					setUsername={setUsername}
					password={password}
					setPassword={setPassword}
					message={errorMessage}
				/>
			</div>}
			{user && <div>
				<BlogDisplay
					blogs={blogs}
					user={user}
					handleLogout={handleLogout}
					addNewBlog={addNewBlog}
					newTitle={newTitle}
					setNewTitle={setNewTitle}
					newAuthor={newAuthor}
					setNewAuthor={setNewAuthor}
					newUrl={newUrl}
					setNewUrl={setNewUrl}
					message={notiMessage}
				/>
			</div>}
		</div>
	)
}

export default App