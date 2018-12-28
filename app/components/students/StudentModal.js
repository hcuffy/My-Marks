import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { actionCreators } from '../../actions/index'
// import styles from '../styles/student.css'

const StudentModal = ({ students }) => {
	console.log(students)

	return (
		<div>
			<Modal isOpen backdrop>
				<ModalHeader>Edit:</ModalHeader>
				<form method="POST">
					<ModalBody />
					<ModalFooter>
						<Button type="button" color="danger">
							Delete
						</Button>

						<Button type="submit" color="primary">
							Update
						</Button>
						<Button type="button" color="secondary">
							Close
						</Button>
					</ModalFooter>
				</form>
			</Modal>
		</div>
	)
}

const mapStateToProps = state => ({ students: state.studentData.Data })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StudentModal)
