import Blog from './Blog'
import Notification from './Notification'
import BlogForm from './BlogForm'
import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const BlogDisplay = ({
	user,
	handleLogout,
	message,
	setNotiMessage }) => {
	// haetut blogit
	const [blogs, setBlogs] = useState([])
	const [formVisible, setFormVisible] = useState(false)

	const hideWhenVisible = { display: formVisible ? 'none' : '' }
	const showWhenVisible = { display: formVisible ? '' : 'none' }

	// blogien hakeminen
	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)
	}, [])

	return (
		<div>
			<h2>blogs</h2>
			<Notification message={message}/>
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
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)}
		</div>
	)
}

export default BlogDisplay