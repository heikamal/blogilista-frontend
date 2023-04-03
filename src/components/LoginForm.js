import Error from './Error'

const LoginForm = (props) => {
	return (
		<div>
			<h2>log in to application</h2>
			<Error message={props.message}/>
			<form onSubmit={props.handleLogin}>
				<div>
            username
					<input
						type="text"
						value={props.username}
						name="Username"
						onChange={({ target }) => props.setUsername(target.value)}
					/>
				</div>
				<div>
            password
					<input
						type="password"
						value={props.password}
						name="Password"
						onChange={({ target }) => props.setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)
}

export default LoginForm