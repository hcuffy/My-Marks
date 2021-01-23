import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {DialogFrame} from '../helpers';
import {actionCreators} from '../../actions/index';
import {filterObjectData} from '../classroom/formHelpers';
import {generateFields, resolveHiddenInput} from './modalHelper';

function StudentDialog({t, studentList, classData, actions}) {
    const {studentId, studentDialog, students} = studentList;
    const requiredStudent = filterObjectData(students, studentId);
    const studentFields = generateFields(t, requiredStudent, classData, studentList);
    const hiddenInput = resolveHiddenInput(studentId);

    const footerData = {
        dataId:       studentId,
        nameId:       null,
        closeId:      studentId,
        deleteAction: actions.deleteSingleStudent,
        closeAction:  actions.showDialog
    };

    return (
        <div>
            {DialogFrame(
                t,
                studentDialog,
                actions.updateStudent,
                studentFields,
                hiddenInput,
                footerData
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    studentList: state.studentData,
    classData:   state.classData.classData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(StudentDialog));