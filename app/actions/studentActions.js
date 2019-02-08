import {
	ADD_NEW_STUDENT,
	GET_ALL_STUDENTS,
	GET_SINGLE_STUDENT,
	DISPLAY_STUDENT_GRAPH
} from '../constants/actionTypes'
import { addNewStudentData, getAllStudents } from '../database/studentCollection'

export const addNewStudent = event => async dispatch => {
	event.preventDefault()

	const formData = {
		Firstname: event.target.Firstname.value,
		Lastname: event.target.Lastname.value,
		Gender: event.target.Gender.value,
		Classroom: event.target.Classroom.value
	}
	addNewStudentData(formData)
	event.target.reset()
	const students = await getAllStudents()
	dispatch({
		type: ADD_NEW_STUDENT,
		payload: {}
	})
	dispatch({
		type: GET_ALL_STUDENTS,
		payload: { students }
	})
}

export const getStudents = () => async dispatch => {
	const students = await getAllStudents()
	if (students.length !== 0) {
		dispatch({
			type: GET_ALL_STUDENTS,
			payload: { students }
		})
	}
}

export const showStudentModal = event => dispatch => {
	const studentId = event.target.getAttribute('data-id')
	dispatch({
		type: GET_SINGLE_STUDENT,
		payload: studentId
	})
}

export const openStudenGraph = event => dispatch => {
	const student = {
		studentGraphId: event.target.getAttribute('data-id'),
		studentGraphName: event.target.innerText
	}

	dispatch({
		type: DISPLAY_STUDENT_GRAPH,
		payload: student
	})
}
