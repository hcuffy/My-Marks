import {
	GET_SELECTED_CLASS,
	ADD_NEW_EXAM,
	UPDATE_DROPDOWN_CLASS_LIST,
	DISPLAY_SUBJECT_LIST,
	GET_SINGLE_EXAM
} from '../constants/actionTypes'
import { addExamData, getExamData } from '../database/examCollection'

export const addNewExam = event => dispatch => {
	event.preventDefault()
	const selectedSubjectIndex = event.target.subject.selectedIndex
	const examData = {
		title: event.target.title.value,
		// eslint-disable-next-line max-len
		subjectId: event.target.subject.options[selectedSubjectIndex].getAttribute('data-id'),
		date: event.target.date.value,
		weight: event.target.weight.value
	}
	addExamData(examData)
	dispatch({
		type: ADD_NEW_EXAM,
		payload: {}
	})
}

export const getSelectedSubject = event => dispatch => {
	const subject = event.target.value
	dispatch({
		type: GET_SELECTED_CLASS,
		payload: subject
	})
}

export const openClassDropdownList = event => dispatch => {
	const classroom = event.target.innerText
	dispatch({
		type: UPDATE_DROPDOWN_CLASS_LIST,
		payload: classroom
	})
}

export const displayExamData = event => async dispatch => {
	const subjectId = event.target.getAttribute('data-id')
	const selectedSubject = event.target.innerText
	console.log(selectedSubject)
	const exams = await getExamData()
	if (exams.length !== 0) {
		dispatch({
			type: DISPLAY_SUBJECT_LIST,
			payload: { exams, subjectId, selectedSubject }
		})
	}
}

export const showSingleExam = event => dispatch => {
	const examId = event.target.getAttribute('data-id')
	dispatch({
		type: GET_SINGLE_EXAM,
		payload: examId
	})
}
