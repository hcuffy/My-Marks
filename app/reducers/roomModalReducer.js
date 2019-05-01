import { OPEN_CLOSE_ROOM_MODAL, UPDATE_CLASSROOM } from '../constants/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	id: '',
	showModal: false
}

const applyClassModal = (state = initialLoadState, action) => {
	const showModal = !state.showModal

	switch (action.type) {
	case OPEN_CLOSE_ROOM_MODAL: {
		const { id } = action.payload
		console.log(state.showModal)
		console.log(showModal)

		return _.assign({}, state, {
			id,
			showModal
		})
	}
	case UPDATE_CLASSROOM: {
		const { id } = action.payload

		return _.assign({}, state, {
			id,
			showModal
		})
	}
	default:
		return state
	}
}

export default applyClassModal
