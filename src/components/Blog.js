import { useState } from 'react'
import TogglableButton from './TogglableButton'
import blogService from '../services/blogs'

const Blog = ({ blog, setNotiMessage, blogs, setBlogs }) => {

	const [blogInfoVisible, setBlogInfoVisible] = useState(false)
	const showWhenVisible = { display: blogInfoVisible ? '' : 'none' }

	const updateLikes = async (event) => {
		event.preventDefault()
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

	const removeBlog = async (event) => {
		event.preventDefault()
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
		<div className="blog">
			{blog.title} {blog.author} <TogglableButton state={blogInfoVisible}
				handler1={() => setBlogInfoVisible(false)}
				handler2={() => setBlogInfoVisible(true)}
				text1='hide'
				text2='view' />
			<div style={showWhenVisible}>
				<p>
					{blog.url}<br/>
					likes: {blog.likes} <button onClick={updateLikes}>like</button><br/>
					{blog.user.name}<br/>
					<button onClick={removeBlog}>remove</button>
				</p>
			</div>

		</div>
	)
}

export default Blog