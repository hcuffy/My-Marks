import React from 'react'
import { filterObjectData } from '../../rooms/helpers/formHelpers'
import { Button, Input, Label } from 'reactstrap'
import css from '../styles/subject.css'

const _ = require('lodash')

const getClassroomId = dataList => {
	if (_.isEmpty(dataList) || _.isNil(dataList)) {
		return []
	}

	return dataList[0].classroomId
}

export const selectedSubject = (t, subject, isInvalid) => {
	return _.keys(subject).map((data, idx) => (
		<div key={idx} className={css.modal_form_div}>
			<Label className={css.modal_form_label} htmlFor={`${data}_Id`}>
				{t(`room.${data}`)}:
			</Label>

			<Input
				name={data}
				className={`${css.badge_number} form-control`}
				data-id={`${data}_Id`}
				type="text"
				defaultValue={subject[data]}
				invalid={isInvalid && _.isEmpty(subject[data])}
			/>
		</div>
	))
}

export const determineSubjectInputs = (filteredData, id, subjectModalData) => {
	const { name, abbreviation, isInvalid } = subjectModalData

	if (isInvalid === true) {
		return { name, abbreviation }
	} else {
		return filterObjectData(filteredData, id)
	}
}

export const resolveHiddenInput = (filteredData, id) => (
	<div>
		<Input
			type="hidden"
			name="classroomId"
			data-id={getClassroomId(filteredData)}
		/>

		<Input type="hidden" name="subjectId" data-id={id} />
	</div>
)