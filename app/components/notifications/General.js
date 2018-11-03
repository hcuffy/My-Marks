// @flow
import { toast } from 'react-toastify'

export const saveSuccessful = () => {
	toast.success('Your data was saved successfully.', {
		position: 'top-right',
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const saveError = () => {
	toast.error('Your data could not be saved.', {
		position: 'top-right',
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const unableToRetrieve = () => {
	toast.success('Unable to retireve data from database', {
		position: 'top-right',
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const entryAlreadyExists = () => {
	toast.error('Entry already exists in database.', {
		position: 'top-right',
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}
