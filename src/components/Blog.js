import { useState } from 'react'
import TogglableButton from './TogglableButton'

const Blog = ({ blog }) => {

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
					likes: {blog.likes} <button>like</button><br/>
					{blog.user.name}
				</p>
			</div>

		</div>
	)
}

export default Blog