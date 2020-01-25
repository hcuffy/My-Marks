import {
	DISPLAY_SCHOOL_DATA,
	HANDLE_SCHOOL_DATA,
	UPDATE_GRADING_DATA,
	GET_SYSTEM_TYPE
} from './constants'

const _ = require('lodash')

const initialLoadState = {
	title: null,
	street: null,
	province: null,
	country: null,
	zip: null,
	city: null,
	year: null
}

const gradingLoadState = { note: true, points: false, percent: false }

export const handleSchoolReducer = (state = initialLoadState, action) => {
	switch (action.type) {
		case HANDLE_SCHOOL_DATA: {
			return _.assign({}, state, action.payload)
		}
		default:
			return state
	}
}

export const applyGradeSystem = (state = gradingLoadState, action) => {
	switch (action.type) {
		case UPDATE_GRADING_DATA: {
			return _.assign({}, state, action.payload)
		}
		case GET_SYSTEM_TYPE: {
			return _.assign({}, state, action.payload)
		}
		default:
			return state
	}
}

const applyAddressData = (state = initialLoadState, action) => {
	switch (action.type) {
		case DISPLAY_SCHOOL_DATA: {
			const {
				title,
				street,
				province,
				country,
				zip,
				city,
				year
			} = action.payload

			return _.assign({}, state, {
				title,
				street,
				province,
				country,
				zip,
				city,
				year
			})
		}

		default:
			return state
	}
}

export default applyAddressData
