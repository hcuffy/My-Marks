import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { actionCreators } from '../../actions/index'
import { cleanAndFilterData } from '../rooms/RoomModal'
import generateFields from './ExamModalHelper'

const ExamModal = ({ examModal, examId, exams, subjectId, actions }) => {
	const requiredExam = cleanAndFilterData(exams, { id: examId })
	const examFormData = generateFields(requiredExam)

	return (
		<div>
			<Modal isOpen={examModal} backdrop>
				<ModalHeader>Edit:</ModalHeader>
				<form onSubmit={actions.updateExam} method="POST">
					<ModalBody>
						{examFormData}
						<input type="hidden" name="SubjectId" id={subjectId} />
						<input type="hidden" name="ExamId" id={examId} />
					</ModalBody>
					<ModalFooter>
						<Button
							id={examId}
							name={subjectId}
							onClick={actions.deleteSingleExam}
							type="button"
							color="danger"
						>
							Delete
						</Button>

						<Button type="submit" color="primary">
							Update
						</Button>
						<Button onClick={actions.showSingleExam} color="secondary">
							Close
						</Button>
					</ModalFooter>
				</form>
			</Modal>
		</div>
	)
}
const mapStateToProps = state => ({
	examModal: state.examData.examModal,
	examId: state.examData.examId,
	exams: state.examData.exams,
	subjectId: state.examData.subjectId
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExamModal)
