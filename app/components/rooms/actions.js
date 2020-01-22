import {
	CHANGE_CLASSROOM_TAB,
	ADD_CLASSROOM_DATA,
	GET_CLASSROOM_DATA,
	UPDATE_CLASSROOM,
	OPEN_CLOSE_ROOM_MODAL,
	CLASSROOM_FORM_VALIDATION
} from './constants'
import {
	addClassroomData,
	getClassroomData,
	deleteClassroom,
	updateRoomData
} from '../../collections/classroom'
import { inputValidation } from '../helpers/formValidation'

const _ = require('lodash')

export const changeClassroomTab = event => dispatch => {
	const tabButtons = {
		classTab: '',
		examTab: ''
	}

	const tabUpdate = _.set(
		tabButtons,
		event.target.getAttribute('data-name'),
		'active'
	)

	dispatch({
		type: CHANGE_CLASSROOM_TAB,
		payload: tabUpdate
	})
}

const clearedForm = {
	name: '',
	teacher: '',
	substitute: '',
	check: true,
	isInvalid: false
}

export const handleClassData = event => async dispatch => {
	event.preventDefault()

	const formData = {
		name: event.target.name.value,
		teacher: event.target.teacher.value,
		substitute: event.target.substitute.value
	}

	if (inputValidation(formData)) {
		dispatch({
			type: CLASSROOM_FORM_VALIDATION,
			payload: { formData, isInvalid: true, check: true }
		})
	} else {
		event.target.reset()

		addClassroomData(formData)

		const data = await getClassroomData()

		dispatch({
			type: ADD_CLASSROOM_DATA,
			payload: { clearedForm }
		})
	}
}

export const displayClassData = () => async dispatch => {
	const data = await getClassroomData()

	if (data.length !== 0) {
		dispatch({
			type: GET_CLASSROOM_DATA,
			payload: { classData: data, check: false }
		})
	}
}

export const updateRoom = event => async dispatch => {
	event.preventDefault()

	const roomData = {
		name: event.target.name.value,
		teacher: event.target.teacher.value,
		substitute: event.target.substitute.value,
		oldName: event.target.oldName.getAttribute('data-id'),
		id: '',
		showModal: true
	}

	const docs = await updateRoomData(roomData)

	if (docs) {
		roomData.showModal = false
		dispatch({
			type: GET_CLASSROOM_DATA,
			payload: { classData: docs, check: false }
		})
	}

	dispatch({
		type: UPDATE_CLASSROOM,
		payload: roomData
	})
}

export const deleteRoom = event => async dispatch => {
	const roomData = {
		id: event.target.getAttribute('data-id'),
		showModal: true
	}

	const docs = await deleteClassroom(roomData)

	if (docs) {
		dispatch({
			type: GET_CLASSROOM_DATA,
			payload: { classData: docs, check: false }
		})
	}

	dispatch({
		type: UPDATE_CLASSROOM,
		payload: roomData
	})
}

export const roomModalDisplay = event => dispatch => {
	event.preventDefault()

	const roomId = {
		id: event.target.getAttribute('data-id')
	}

	dispatch({
		type: OPEN_CLOSE_ROOM_MODAL,
		payload: roomId
	})
}
