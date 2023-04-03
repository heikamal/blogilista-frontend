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

export default TogglableButton