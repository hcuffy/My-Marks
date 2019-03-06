import React from 'react'
import { connect } from 'react-redux'
import { t } from '../utils/translationUtil'
import styles from './styles/homepage.css'

const _ = require('lodash')

const Homepage = ({ addressData }) => {
	const entry = _.values(addressData).map((data, idx) => <li key={idx}>{data}</li>)
	console.log(entry)
	return (
		<div className={styles.main_school_div}>
			<div className={styles.school_left_div}>
				<div>
					<p>Your School Address</p>
					<span>{entry}</span>
				</div>
				<div className={styles.page_inner_div}>
					<p>Your Classrooms</p>
					<span>Under Development</span>
				</div>
			</div>

			<div className={styles.school_right_div}>
				<div>
					<p>{t('title')}</p>
					<span>Under Development</span>
				</div>
				<div className={styles.page_inner_div}>
					<p>Your Subjects</p>
					<span>Under Development</span>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	addressData: state.addressData
})

export default connect(
	mapStateToProps,
	null
)(Homepage)
