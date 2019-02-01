/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import styles from '../styles/students.css'

const genderDropdown = (
	<div className={`${styles.select_dropDown} ${styles.form_div}`}>
		<label className={styles.form_label} htmlFor="gSelect">
			Gender:
		</label>
		<select type="text" name="Gender" className="form-control">
			<option className="form-control dropdown">Male</option>
			<option className="form-control dropdown">Female</option>
		</select>
	</div>
)

const classroomDropdown = options => (
	<div className={`${styles.select_dropDown} ${styles.form_div}`}>
		<label className={styles.form_label} htmlFor="cSelect">
			Classroom:
		</label>
		<select type="text" name="Classroom" className="form-control">
			{options}
		</select>
	</div>
)
const studentForm = (selectOption, formFields, actions) => {
	const studentFields = (
		<div>
			<form onSubmit={actions.addNewStudent} method="POST">
				<div className={styles.form_outer_div}>
					<h4 className={styles.center_sub_header}>Add Student</h4>
					{formFields}
					{genderDropdown}
					{classroomDropdown(selectOption)}
					<div className={(styles.form_inner_div, styles.save_btn)}>
						<button type="submit" className="btn btn-success">
							Save
						</button>
					</div>
				</div>
			</form>
			<div />
		</div>
	)
	return studentFields
}

export default studentForm
