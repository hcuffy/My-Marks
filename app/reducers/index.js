import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import displaySchoolData from './schoolDataReducer'
import handleTabChange from './changeTabReducer'
import displayClassData from './classDataReducer'
import handleClassModal from './roomModalReducer'
import handleSubjectModal from './subjectModalReducer'
import openClassList, { getSubjectData } from './subjectReducer'
import filterExam from './examReducer'
import handleStudentData from './studentsReducer'
import gradeData from './gradeTableReducer'

export default function createRootReducer(history: History) {
	return combineReducers({
		router: connectRouter(history),
		schoolData: displaySchoolData,
		classData: displayClassData,
		subjectData: getSubjectData,
		studentData: handleStudentData,
		examData: filterExam,
		selectClass: openClassList,
		tabStatus: handleTabChange,
		roomModal: handleClassModal,
		subjectModal: handleSubjectModal,
		gradeData
	})
}
