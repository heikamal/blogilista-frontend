import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setNotiMessage, setFormVisible, user }) => {

	// uuden blogin tiedot
	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')

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
				let returnedBlog = { ...returned, user: user }
				setBlogs(blogs.concat(returnedBlog))
				setNotiMessage(`a new blog ${newTitle} by ${newAuthor} added`)
				setTimeout(() => {
					setNotiMessage(null)
				}, 5000)
			})
		setNewTitle('')
		setNewAuthor('')
		setNewUrl('')
		setFormVisible(false)
	}

	return (
		<form onSubmit={addNewBlog}>
			<div>
				title
				<input
					type="text"
					value={newTitle}
					name="Title"
					onChange={({ target }) => setNewTitle(target.value)}
				/>
			</div>
			<div>
				author
				<input
					type="text"
					value={newAuthor}
					name="Author"
					onChange={({ target }) => setNewAuthor(target.value)}
				/>
			</div>
			<div>
				url
				<input
					type="text"
					value={newUrl}
					name="Url"
					onChange={({ target }) => setNewUrl(target.value)}
				/>
			</div>
			<button type='submit'>create</button>
		</form>
	)
}

export default BlogForm