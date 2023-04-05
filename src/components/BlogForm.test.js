import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls the blog submit function with right parameters', async () => {
    const user = userEvent.setup()
    const addNewBlog = jest.fn()
    
    const { container } = render(<BlogForm addNewBlog={addNewBlog} />)

    const inputTitle = container.querySelector('.title-field')
    const inputAuthor = container.querySelector('.author-field')
    const inputUrl = container.querySelector('.url-field')
    const sendButton = screen.getByText('create')

    await user.type(inputTitle, 'testiblog')
    await user.type(inputAuthor, 'minä')
    await user.type(inputUrl, 'localhost')

    await user.click(sendButton)
    expect(addNewBlog.mock.calls).toHaveLength(1)
    expect(addNewBlog.mock.calls[0][0].title).toBe('testiblog')
    expect(addNewBlog.mock.calls[0][0].author).toBe('minä')
    expect(addNewBlog.mock.calls[0][0].url).toBe('localhost')

})