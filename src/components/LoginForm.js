import Error from './Error'
import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ setErrorMessage, message, setUser }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

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

	return (
		<div>
			<h2>log in to application</h2>
			<Error message={message}/>
			<form onSubmit={handleLogin}>
				<div>
            username
					<input
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
            password
					<input
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)
}

export default LoginForm