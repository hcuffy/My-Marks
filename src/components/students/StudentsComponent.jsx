import React from 'react';
import {withTranslation} from 'react-i18next';

import AddStudentForm from './StudentForm';
import StudentList from './StudentList';
import StudentChart from './StudentChart';
import StudentDropdown from './StudentDropdown';
import css from './style.css';

function StudentsComponent({t}) {
    return (
        <div>
            <div>
                <h4 className={css.center_header}>{t('student.title')}</h4>
                <AddStudentForm t={t} />
                <StudentList t={t} />
            </div>

            <div className={css.chart_div}>
                <h4 className={css.chart_header}>{t('student.chartTitle')}</h4>
                <StudentDropdown t={t} />
                <StudentChart t={t} />
            </div>
        </div>
    );
}

export default withTranslation()(StudentsComponent);