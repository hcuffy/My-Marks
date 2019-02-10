import {
	OPEN_GRAPH_CLASS_LIST,
	GET_ALL_GRADES,
	DISPLAY_SUBJECT_GRADES,
	GET_ALL_EXAMS,
	DISPLAY_EXAM_GRADES
} from '../constants/actionTypes'

const _ = require('lodash')

const initialLoadState = {
	classroom: 'Select Class',
	subjectName: 'Select Subject',
	subjectId: null,
	examId: null,
	classroomDropdown: false,
	openSubList: false,
	openExamList: false,
	examName: 'Select Exam',
	chartToDisplay: null,
	chartTitle: null
}

const applyGraphData = (state = initialLoadState, action) => {
	switch (action.type) {
	case OPEN_GRAPH_CLASS_LIST: {
		const classroomDropdown = !state.classroomDropdown
		const { classroom, chartTitle, chartToDisplay } = action.payload
		return _.assign({}, state, {
			classroomDropdown,
			classroom,
			chartTitle,
			chartToDisplay
		})
	}
	case DISPLAY_SUBJECT_GRADES: {
		const openSubList = !state.openSubList
		const { subjectId, subjectName, chartTitle, chartToDisplay } = action.payload
		return _.assign({}, state, {
			openSubList,
			subjectId,
			subjectName,
			chartTitle,
			chartToDisplay
		})
	}
	case DISPLAY_EXAM_GRADES: {
		const openExamList = !state.openExamList
		const { examId, examName, chartTitle, chartToDisplay } = action.payload
		return _.assign({}, state, {
			openExamList,
			examId,
			examName,
			chartTitle,
			chartToDisplay
		})
	}
	case GET_ALL_EXAMS: {
		const { exams } = action.payload
		return _.assign({}, state, { exams })
	}

	case GET_ALL_GRADES: {
		return _.assign({}, state, action.payload)
	}
	default:
		return state
	}
}

export default applyGraphData
