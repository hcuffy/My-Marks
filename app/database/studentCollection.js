/* eslint-disable no-underscore-dangle */
import {
	saveSuccessful,
	saveFailed,
	unableToRetrieve,
	deletionFailed,
	deletionSuccessful,
	updateFailed,
	updateSuccessful
} from '../notifications/general'

const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const collectionsPath = path.join(userDataPath, 'collections')
const studentCollection = new Datastore({
	filename: path.join(collectionsPath, 'student.db'),
	autoload: true,
	corruptAlertThreshold: 1,
	timestampData: true
})

export const addNewStudentData = data => {
	studentCollection.insert(data, error => {
		if (error) {
			saveFailed()
			return error
		}
		saveSuccessful()
	})
}

export const getAllStudents = () =>
	new Promise((resolve, reject) =>
		studentCollection.find({}, (err, docs) => {
			if (err) {
				unableToRetrieve()
				return reject(err)
			}
			return resolve(docs)
		})
	)

export const deleteStudent = data =>
	new Promise((resolve, reject) =>
		studentCollection.remove({ _id: data }, err => {
			if (err) {
				deletionFailed()
				return reject(err)
			}
			studentCollection.find({}, (error, docs) => {
				if (err) {
					deletionFailed()
					return reject(err)
				}
				deletionSuccessful()
				return resolve(docs)
			})
		})
	)

const updateSinlgStudent = previous => {
	const { Firstname, Lastname, Gender, Classroom, Id } = previous

	studentCollection.update(
		{ _id: Id },
		{
			Firstname,
			Lastname,
			Gender,
			Classroom
		},
		{},
		err => {
			if (err) {
				updateFailed()
				return err
			}
			updateSuccessful()
		}
	)
}

export const updateStudentData = data =>
	new Promise((resolve, reject) => {
		updateSinlgStudent(data)
		studentCollection.find({}, (error, docs) => {
			if (error) {
				updateFailed()
				return reject(error)
			}
			return resolve(docs)
		})
	})
