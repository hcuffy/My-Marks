// @flow
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import styles from './styles/list.css'

const _ = require('lodash')

const List = ({ listData, actions }) => {
  const selectedData = _.pick(listData, ['classData'])
  const list_inputs = selectedData.classData.map((data, idx) => (
    <button
      key={idx}
      type="button"
      className={`list-group-item list-group-item-action ${styles.list_btn}`}
    >
      {data.Name}
      <span className={`badge badge-warning badge-pill ${styles.badge_number}`}>
        {data.Subjects.length}
      </span>
    </button>
  ))
  return (
    <div>
      <div className="list-group list-group-flush">{list_inputs}</div>
    </div>
  )
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
  null,
  mapDispatchToProps
)(List)
