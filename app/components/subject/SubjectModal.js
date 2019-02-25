import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { modalFrame } from '../helpers/editModal'
import { actionCreators } from '../../actions/index'
import { cleanAndFilterData } from '../rooms/RoomModal'
import styles from './styles/subject.css'

const _ = require('lodash')

const getClassroomId = dataList => {
	if (_.isEmpty(dataList) || _.isNil(dataList)) {
		return []
	}
	return dataList[0].classroomId
}

const selectedSubject = subject =>
	_.keys(subject).map((data, idx) => (
		<div key={idx} className={styles.modal_form_div}>
			<label className={styles.modal_form_label} htmlFor={`${data}_Id`}>
				{data}:
			</label>
			<input
				name={data}
				className={`${styles.badge_number} form-control`}
				data-id={`${data}_Id`}
				type="text"
				defaultValue={subject[data]}
			/>
		</div>
	))

const SubjectModal = ({ filteredData, subjectModalData, actions }) => {
	const requiredSubject = cleanAndFilterData(filteredData, subjectModalData)
	const subjectFields = selectedSubject(requiredSubject)
	const hiddenInputs = (
		<div>
			{/* eslint-disable-next-line max-len */}
			<input type="hidden" name="classroomId" data-id={getClassroomId(filteredData)} />
			<input type="hidden" name="subjectId" data-id={subjectModalData.id} />
		</div>
	)
	const footerData = {
		dataId: subjectModalData.id,
		nameId: null,
		closeId: subjectModalData.id,
		deleteAction: actions.deleteSingleSubject,
		closeAction: actions.subjectModalDisplay
	}
	return (
		<div>
			{modalFrame(
				subjectModalData.showSubjectModal,
				actions.updateSubject,
				subjectFields,
				hiddenInputs,
				footerData
			)}
		</div>
	)
}

const mapStateToProps = state => ({ subjectModalData: state.subjectModalData })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SubjectModal)
