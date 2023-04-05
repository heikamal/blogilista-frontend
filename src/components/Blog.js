import { useState } from 'react'
import TogglableButton from './TogglableButton'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLikes, removeBlog }) => {
	const [blogInfoVisible, setBlogInfoVisible] = useState(false)
	const showWhenVisible = { display: blogInfoVisible ? '' : 'none' }

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

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	updateLikes: PropTypes.func.isRequired,
	removeBlog: PropTypes.func.isRequired,
}

export default Blog