import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {actionCreators} from '../../actions/index';
import {filterObjectData} from '../classroom/formHelpers';
import {ModalFrame} from '../helpers/editModal';
import {generateExamForm, resolveHiddenInputs} from './modalHelper';

const ExamModal = ({t, examData, actions}) => {
    const {examModal, examId, exams, subjectId} = examData;
    const requiredExam = filterObjectData(exams, examId);
    const examFormData = generateExamForm(t, requiredExam, examData);
    const hiddenInputs = resolveHiddenInputs(subjectId, examId);

    const footerData = {
        dataId:       examId,
        nameId:       subjectId,
        closeId:      null,
        deleteAction: actions.deleteSingleExam,
        closeAction:  actions.showSingleExam
    };

    return (
        <div>
            {ModalFrame(
                t,
                examModal,
                actions.updateExam,
                examFormData,
                hiddenInputs,
                footerData
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    examData: state.examData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ExamModal));
