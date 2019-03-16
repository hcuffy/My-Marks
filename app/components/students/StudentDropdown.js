import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { t, resolveLabel } from '../../utils/translationUtil'
import { actionCreators } from '../../actions/index'
import { downloadPDF } from '../../utils/pdfUtil'
import {
	getStudentList,
	getAllSubjects,
	createDropdown,
	notifyIfEmpty
} from '../helpers/dropdowns'
import styles from './styles/students.css'

const _ = require('lodash')

const PDFbutton = chartTitle => (
	<button
		className={styles.pdf_btn}
		type="button"
		onClick={() => downloadPDF('canvas', chartTitle, 'chart')}
	>
		<i className="fas fa-file-pdf fa-2x" /> <br />
		{t('general.saveAs')}
	</button>
)

const StudentDropdown = ({ studentData, subjectData, actions }) => {
	const {
		students,
		studentDropdown,
		subjectDropdown,
		chartToDisplay,
		studentGraphName,
		subjectGraphName
	} = studentData

	const studentOptions = getStudentList(students)
	const subjectOptions = getAllSubjects(subjectData.data)
	const openIt = { subjectDropdown }

	if (chartToDisplay === 'subject' && _.isNull(studentGraphName)) {
		notifyIfEmpty([], true, 'student')
		openIt.subjectDropdown = false
	}
	return (
		<div className={styles.dropdown_main_div}>
			{createDropdown(
				styles.dropdown_one,
				studentDropdown,
				actions.openStudenGraph,
				resolveLabel(studentGraphName, t('general.selectStudent')),
				studentOptions
			)}
			{createDropdown(
				styles.dropdown_two,
				openIt.subjectDropdown,
				actions.openStudenSubjectGraph,
				resolveLabel(subjectGraphName, t('general.selectSubject')),
				subjectOptions
			)}
			{PDFbutton(resolveLabel(studentGraphName, t('student.defaultHeader')))}
		</div>
	)
}

const mapStateToProps = state => ({
	studentData: state.studentData,
	subjectData: state.subjectData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StudentDropdown)
