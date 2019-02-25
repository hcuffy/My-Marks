import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { t, resolveLabel } from '../../utils/translationUtil'
import { actionCreators } from '../../actions/index'
import styles from './styles/grades.css'
import { sortData } from '../rooms/ClassList'
import {
	getClassList,
	getSubjectList,
	createDropdown,
	notifyIfEmpty
} from '../helpers/dropdowns'

const _ = require('lodash')

const GradeDropdown = ({ classData, gradeData, subjectData, actions }) => {
	const cleanedClassList = sortData(classData)
	const { subDrop, subjectName, classroom, classroomDropdown } = gradeData
	const openIt = { subDrop }
	const classOptions = getClassList(cleanedClassList)
	const subjectOptions = getSubjectList({ selectedRoom: classroom }, subjectData)

	if (_.isEmpty(subjectOptions) && subDrop) {
		notifyIfEmpty([], true, 'class')
		openIt.subDrop = false
	}

	return (
		<div className={styles.dropdown_main_div}>
			{createDropdown(
				styles.dropdown_div,
				classroomDropdown,
				actions.openGradeClassList,
				resolveLabel(classroom, t('general.selectClass')),
				classOptions
			)}
			{createDropdown(
				styles.dropdown_div,
				subDrop,
				actions.displayGradeData,
				resolveLabel(subjectName, t('general.selectSubject')),
				subjectOptions
			)}
		</div>
	)
}

const mapStateToProps = state => ({
	classData: state.classData,
	subjectData: state.subjectData,
	gradeData: state.gradeData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GradeDropdown)
