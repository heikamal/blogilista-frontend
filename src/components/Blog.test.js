import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const testBlog = {
	author: 'Mutka Järvinen',
	id: '641c5dd283ef399041295103',
	likes: 13,
	title: 'Esimerkkiblogi',
	url: 'rengonkessijamutka.com/blog',
	user: {
		id: '641c4f9c5ed768a7bdce3cd5',
		name: 'Heikki Malkavaara',
		username: 'heimal',
	}
}

const testUser = {
	id: '641c4f9c5ed768a7bdce3cd5',
	name: 'Heikki Malkavaara',
	username: 'heimal',
}

test('renders blog title and author', () => {

	// renderöi Blog-komponentti ja etsi se testattavaksi
	const { container } = render(
		<Blog user={testUser} blog={testBlog} updateLikes={() => {}} removeBlog={() => {}} />
	)
	const div = container.querySelector('.blog')

	// tarkasta että title ja author-kentät tulostuvat oikein
	expect(div).toHaveTextContent(
		'Esimerkkiblogi'
	)
	expect(div).toHaveTextContent(
		'Mutka Järvinen'
	)

})

// TODO: laita toimimaan
test('url, likes and user are shown when the view-button has been pressed', async () => {

	const mockHandler = jest.fn()

	const { container } = render(
		<Blog user={testUser} blog={testBlog} updateLikes={mockHandler} removeBlog={() => {}} />
	)

	const user = userEvent.setup()
	const button1 = screen.getByText('view')
	await user.click(button1)

	const div = container.querySelector('.toggle-view')
	expect(div).toHaveTextContent('rengonkessijamutka.com/blog')
	expect(div).toHaveTextContent('13')
	expect(div).toHaveTextContent('Heikki Malkavaara')

})

test('clicking the like button calls event handler once', async () => {

	const mockHandler = jest.fn()

	render(
		<Blog user={testUser} blog={testBlog} updateLikes={mockHandler} removeBlog={() => {}} />
	)

	const user = userEvent.setup()
	const button1 = screen.getByText('view')
	await user.click(button1)

	const button2 = screen.getByText('like')
	await user.click(button2)
	await user.click(button2)

	expect(mockHandler.mock.calls).toHaveLength(2)


})