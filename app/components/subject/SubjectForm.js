/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from './styles/subject.css'

const _ = require('lodash')

const SubjectForm = ({ classListData, subjects, actions }) => {
	const formLabels = _.pick(classListData, ['name', 'abbreviation'])
	const formInputs = _.values(formLabels).map((data, idx) => (
		<div key={idx} className={styles.form_div}>
			<label className={styles.form_label} htmlFor={`${data}Sid`}>
				{data}:
			</label>
			{/* eslint-disable-next-line max-len */}
			<input name={data} className="form-control" data-id={`${data}Sid`} type="text" />
		</div>
	))

	const selectOption = _.values(subjects).map((data, idx) => (
		<option className="form-control dropup" key={idx}>
			{data.Name}
		</option>
	))

	return (
		<div>
			<form onSubmit={actions.addNewSubject} method="POST">
				{formInputs}
				<div className={styles.form_div}>
					<label className={styles.form_label} htmlFor="cSelect">
						Select Class:
					</label>
					<select type="text" size="2" name="Room" className="form-control">
						{selectOption}
					</select>
				</div>
				<div className={styles.subject_save}>
					<button type="submit" className="btn btn-success">
						Add
					</button>
				</div>
			</form>
		</div>
	)
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	null,
	mapDispatchToProps
)(SubjectForm)
