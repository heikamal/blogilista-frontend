import Blog from './Blog'
import Notification from './Notification'

const BlogForm = (props) => {
	return (
		<form onSubmit={props.addNewBlog}>
			<div>
				title
				<input
					type="text"
					value={props.newTitle}
					name="Title"
					onChange={({ target }) => props.setNewTitle(target.value)}
				/>
			</div>
			<div>
				author
				<input
					type="text"
					value={props.newAuthor}
					name="Author"
					onChange={({ target }) => props.setNewAuthor(target.value)}
				/>
			</div>
			<div>
				url
				<input
					type="text"
					value={props.newUrl}
					name="Url"
					onChange={({ target }) => props.setNewUrl(target.value)}
				/>
			</div>
			<button type='submit'>create</button>
		</form>
	)
}

const BlogDisplay = (props) => {
	return (
		<div>
			<h2>blogs</h2>
			<Notification message={props.message}/>
			<BlogForm
				addNewBlog={props.addNewBlog}
				newTitle={props.newTitle}
				setNewTitle={props.setNewTitle}
				newAuthor={props.newAuthor}
				setNewAuthor={props.setNewAuthor}
				newUrl={props.newUrl}
				setNewUrl={props.setNewUrl} />
			<p>
				{props.user.name} logged in
				<button onClick={props.handleLogout}>logout</button>
			</p>
			{props.blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)}
		</div>
	)
}

export default BlogDisplay