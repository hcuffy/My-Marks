import {
	GET_SELECTED_CLASS,
	UPDATE_DROPDOWN_CLASS_LIST,
	DISPLAY_SUBJECT_LIST,
	GET_SINGLE_EXAM
} from '../actions/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	subject: '',
	openClassDropdown: false,
	openSubList: false,
	selectedRoom: '',
	examModal: false
}

const filterExam = (state = initialLoadState, action) => {
	switch (action.type) {
	case GET_SELECTED_CLASS: {
		const subject = action.payload
		return _.assign({}, state, { subject })
	}
	case UPDATE_DROPDOWN_CLASS_LIST: {
		const openClassDropdown = !state.openClassDropdown
		const openSubList = state.openClassDropdown
		const selectedRoom = action.payload
		return _.assign({}, state, {
			openClassDropdown,
			selectedRoom,
			openSubList
		})
	}
	case GET_SINGLE_EXAM: {
		const examModal = !state.examModal
		return _.assign({}, state, { examModal })
	}
	case DISPLAY_SUBJECT_LIST: {
		const openClassDropdown = false
		const openSubList = false
		const { exams, subjectId } = action.payload

		return _.assign({}, state, {
			openClassDropdown,
			openSubList,
			exams,
			subjectId
		})
	}
	default:
		return state
	}
}

export default filterExam
