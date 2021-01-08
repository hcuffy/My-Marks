import _ from 'lodash';

import {filterBySubject} from '../../graphs/chartData';
import {resolveLabel} from '../../../utils';

function filteredGrades({studentGraphId}, grades) {
    const data = [];
    const studentGrades = _.sortBy(
        _.filter(grades, grade => grade.studentId === studentGraphId && grade.grade > 0), ['date']
    );

    for (let i = 0; i < studentGrades.length; i += 1) {
        data.push({
            t: studentGrades[i].date,
            y: studentGrades[i].grade
        });
    }

    return data;
}

function filterSubjectGrades({studentGraphId, subjectGraphId}, exams, grades) {
    const allSubjectsGrade = filterBySubject(subjectGraphId, exams, grades);

    return _.filter(allSubjectsGrade, ['studentId', studentGraphId]);
}

export function chartHeader(t, {studentGraphName, subjectGraphName, chartToDisplay}) {
    if (chartToDisplay === null || chartToDisplay === 'student') {
        return resolveLabel(studentGraphName, t('student.defaultHeader'));
    }

    if (_.isNull(studentGraphName)) {
        return 'Student Grades';
    }

    return `${studentGraphName} - ${subjectGraphName}`;
}

export function chartData(t, studentData, grades, exams) {
    const checkedGrades = [];
    const {chartToDisplay} = studentData;

    if (chartToDisplay === 'student') {
        if (!_.isUndefined(grades)) {
            checkedGrades.push(...grades);
        }
    } else if (chartToDisplay === 'subject') {
        checkedGrades.push(...filterSubjectGrades(studentData, exams, grades));
    }

    return {
        datasets: [
            {
                label:                chartHeader(t, studentData),
                fill:                 false,
                pointHoverRadius:     20,
                pointRadius:          5,
                borderColor:          'rgba(255, 99, 132, 0.6)',
                backgroundColor:      'rgba(255, 99, 132, 0.6)',
                pointBackgroundColor: 'rgba(255, 99, 132, 0.6)',
                data:                 filteredGrades(studentData, checkedGrades)
            }
        ]
    };
}