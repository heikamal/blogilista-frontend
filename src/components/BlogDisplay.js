import Blog from './Blog'
import Notification from './Notification'
import BlogForm from './BlogForm'
import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogDisplay = ({
	user,
	handleLogout }) => {
	// haetut blogit
	const [blogs, setBlogs] = useState([])
	const [formVisible, setFormVisible] = useState(false)
	const [notiMessage, setNotiMessage] = useState(null)

	const hideWhenVisible = { display: formVisible ? 'none' : '' }
	const showWhenVisible = { display: formVisible ? '' : 'none' }

	// blogien hakeminen
	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)
	}, [])

	const sortBlogs = []
		.concat(blogs)
		.sort((a, b) => a.likes < b.likes ? 1 : -1)
		.map((blog) =>
			<Blog key={blog.id}
				blog={blog}
				setNotiMessage={setNotiMessage}
				blogs={blogs}
				setBlogs={setBlogs}
			/>
		)

	return (
		<div>
			<h2>blogs</h2>
			<Notification message={notiMessage}/>
			<p>
				{user.name} logged in
				<button onClick={handleLogout}>logout</button>
			</p>
			<div style={hideWhenVisible}>
				<button onClick={() => setFormVisible(true)}>add new</button>
			</div>
			<div style={showWhenVisible}>
				<h2>create new</h2>
				<BlogForm
					setNotiMessage={setNotiMessage}
					setBlogs={setBlogs}
					blogs={blogs}
					setFormVisible={setFormVisible}
					user={user}
				/>
				<button onClick={() => {setFormVisible(false)}}>cancel</button>
			</div>
			{sortBlogs}
		</div>
	)
}

BlogDisplay.propTypes = {
	user: PropTypes.object.isRequired,
	handleLogout: PropTypes.func.isRequired,
}

export default BlogDisplay