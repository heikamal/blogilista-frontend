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

	const addNewBlog = (newBlog) => {

		blogService
			.create(newBlog)
			.then(returned => {
				let returnedBlog = { ...returned, user: user }
				setBlogs(blogs.concat(returnedBlog))
				setNotiMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
				setTimeout(() => {
					setNotiMessage(null)
				}, 5000)
			})
		setFormVisible(false)
	}

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
				updateLikes={() => updateLikes(blog)}
				removeBlog={() => removeBlog(blog)}
			/>
		)

	const updateLikes = async (blog) => {
		const updatedBlog = { ...blog, likes: blog.likes + 1 }
		blogService
			.update(blog.id, updatedBlog)
			.then(returned => {
				setBlogs(blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)))
				setNotiMessage(`like added to ${returned.title}`)
				setTimeout(() => {
					setNotiMessage(null)
				}, 5000)
			})
	}

	const removeBlog = async (blog) => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
			blogService
				.remove(blog.id)
				.then(() => {
					setBlogs(blogs.filter(item => item.id !== blog.id))
					setNotiMessage(`${blog.title} removed`)
					setTimeout(() => {
						setNotiMessage(null)
					}, 5000)
				})
		}
	}

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
					addNewBlog={addNewBlog}
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