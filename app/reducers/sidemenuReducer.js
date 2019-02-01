import { HANDLE_MENU_CHANGE } from '../constants/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	home: 'black',
	school: '',
	classroom: '',
	students: '',
	exams: '',
	graphs: ''
}

const applyMenuStyling = (state = initialLoadState, action) => {
	switch (action.type) {
	case HANDLE_MENU_CHANGE: {
		const { styleUpdate } = action.payload
		return _.assign({}, state, styleUpdate)
	}
	default:
		return state
	}
}

export default applyMenuStyling