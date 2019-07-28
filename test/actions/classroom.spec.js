/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import { spy } from 'sinon'
import * as actions from '../../app/actions/classroomActions'
import * as types from '../../app/constants/actionTypes'
import * as events from './mock_modules/eventMocks/classroomActionEvents'

jest.mock('../../app/actions/classroomActions')

describe('test the classroom section actions', () => {
	it('should change the classroom tab', () => {
		const expectedAction = {
			type: types.CHANGE_CLASSROOM_TAB,
			payload: { classTab: '', examTab: 'active' }
		}

		const fn = actions.changeClassroomTab(events.changeTab)
		const dispatch = spy()
		fn(dispatch)

		expect(fn).toBeInstanceOf(Function)
		expect(dispatch.args[0][0]).toEqual(expectedAction)
	})

	it('should add new classrooms', done => {
		const expectedAction = {
			type: types.ADD_CLASSROOM_DATA,
			payload: {
				inputData: [
					{
						name: 'Class 1',
						teacher: 'Sara Tester',
						code: 'CLS1',
						substitute: 'John Tester'
					}
				]
			}
		}

		const fn = actions.handleClassData(events.newClassroom)
		const dispatch = spy()

		expect(fn).toBeInstanceOf(Function)

		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedAction)
			done()
		})
	})

	it('should get all class data', done => {
		const expectedAction = {
			type: types.GET_CLASSROOM_DATA,
			payload: {
				classData: [
					{
						name: 'Class 1',
						teacher: 'Sara Tester',
						code: 'CLS1',
						substitute: 'John Tester'
					}
				]
			}
		}

		const fn = actions.displayClassData()
		const dispatch = spy()

		expect(fn).toBeInstanceOf(Function)

		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedAction)
			done()
		})
	})

	it('should update the classroom data', done => {
		const expectedActionOne = {
			type: types.GET_CLASSROOM_DATA,
			payload: {
				classData: [
					{
						name: 'Class 2',
						teacher: 'John Tester',
						code: 'CLS2',
						substitute: 'Mary Tester'
					}
				]
			}
		}

		const expectedActionTwo = {
			type: types.UPDATE_CLASSROOM,
			payload: {
				name: 'Class 2',
				teacher: 'John Tester',
				code: 'CLS2',
				substitute: 'Mary Tester',
				oldName: 'FH347hfr8f5fnJs',
				id: '',
				showModal: false
			}
		}

		const fn = actions.updateRoom(events.updateClassroom)
		const dispatch = spy()

		expect(fn).toBeInstanceOf(Function)

		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedActionOne)
			expect(dispatch.args[1][0]).toEqual(expectedActionTwo)
			done()
		})
	})

	it('should delete a classroom classroom', done => {
		const expectedActionOne = {
			type: types.GET_CLASSROOM_DATA,
			payload: {
				classData: [
					{
						name: 'Class 3',
						teacher: 'Ludwig Tester',
						code: 'CLS3',
						substitute: 'Susanne Tester'
					}
				]
			}
		}

		const expectedActionTwo = {
			type: types.UPDATE_CLASSROOM,
			payload: {
				id: 'DF347gfr834fnFe',
				showModal: true
			}
		}

		const fn = actions.deleteRoom(events.deleteRoom)
		const dispatch = spy()

		expect(fn).toBeInstanceOf(Function)

		fn(dispatch).then(() => {
			expect(dispatch.args[0][0]).toEqual(expectedActionOne)
			expect(dispatch.args[1][0]).toEqual(expectedActionTwo)
			done()
		})
	})

	it('should open classroom modal', () => {
		const expectedActionOne = {
			type: types.OPEN_CLOSE_ROOM_MODAL,
			payload: {
				id: 'GrtZ7gGHZ34fn4e'
			}
		}

		const fn = actions.roomModalDisplay(events.showModal)
		const dispatch = spy()

		expect(fn).toBeInstanceOf(Function)
		fn(dispatch)
		expect(dispatch.args[0][0]).toEqual(expectedActionOne)
	})
})