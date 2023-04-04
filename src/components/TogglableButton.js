import PropTypes from 'prop-types'

const TogglableButton = ({ state, handler1, handler2, text1, text2 }) => {
	if (state) {
		return (
			<button onClick={handler1}>{text1}</button>
		)
	}

	return (
		<button onClick={handler2}>{text2}</button>
	)
}

TogglableButton.propTypes = {
	state: PropTypes.bool.isRequired,
	handler1: PropTypes.func.isRequired,
	handler2: PropTypes.func.isRequired,
	text1: PropTypes.string.isRequired,
	text2: PropTypes.string.isRequired,
}

export default TogglableButton