/* eslint-disable max-len */
import applyTabChange from '../../app/reducers/changeTabReducer'
import { CHANGE_CLASSROOM_TAB } from '../../app/constants/actionTypes'

describe('test change tab reducer', () => {
	it('should use initial state', () => {
		expect(applyTabChange(undefined, {})).toMatchSnapshot()
	})

	it('should handle CHANGE_CLASSROOM_TAB to classtab', () => {
		const payload = { classTab: 'active', examTab: '' }
		expect(applyTabChange({}, { type: CHANGE_CLASSROOM_TAB, payload })).toMatchSnapshot()
	})

	it('should handle CHANGE_CLASSROOM_TAB to examtab', () => {
		const payload = { classTab: '', examTab: 'active' }
		expect(applyTabChange({}, { type: CHANGE_CLASSROOM_TAB, payload })).toMatchSnapshot()
	})

	it('should handle unknown action type', () => {
		const payload = { classTab: '', examTab: 'active' }
		expect(applyTabChange({}, { type: 'unknown', payload })).toMatchSnapshot()
	})
})