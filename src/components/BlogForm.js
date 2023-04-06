import PropTypes from 'prop-types'
import { useState } from 'react'

const BlogForm = ({ addNewBlog }) => {
	// uuden blogin tiedot
	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')

	const createBlog = (event) => {
		event.preventDefault()
		const newBlog = {
			title: newTitle,
			author: newAuthor,
			url: newUrl,
		}
		addNewBlog(newBlog)
		setNewTitle('')
		setNewAuthor('')
		setNewUrl('')
	}

	return (
		<form onSubmit={createBlog}>
			<div>
				title
				<input
					id='title'
					className='title-field'
					type="text"
					value={newTitle}
					name="Title"
					onChange={({ target }) => setNewTitle(target.value)}
				/>
			</div>
			<div>
				author
				<input
					id='author'
					className='author-field'
					type="text"
					value={newAuthor}
					name="Author"
					onChange={({ target }) => setNewAuthor(target.value)}
				/>
			</div>
			<div>
				url
				<input
					id='url'
					className='url-field'
					type="text"
					value={newUrl}
					name="Url"
					onChange={({ target }) => setNewUrl(target.value)}
				/>
			</div>
			<button id='createBlog-button' type='submit'>create</button>
		</form>
	)
}

BlogForm.propTypes = {
	addNewBlog: PropTypes.func.isRequired,
}

export default BlogForm