import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {applyAddressData, applyGradeSystem} from '../components/settings/reducers';
import {applyTabChange, applyClassData, applyClassDialog} from '../components/classroom/reducers';
import {applyClassList, applySubjectData, applySubjectDialog} from '../components/subject/reducers';
import {applyFilteredExam} from '../components/exam/reducers';
import {applyStudentData} from '../components/students/reducers';
import {applyGradeData} from '../components/grades/reducers';
import {applyMenuStyling} from '../components/sidemenu/reducers';
import {applyGraphData} from '../components/graphs/reducers';
import {applyNotesData} from '../components/notes/reducers';
import {applyCapabilityChanges} from '../components/capability/reducers';
import {applyCalendarChanges} from '../components/calendar/reducers';

export default function createRootReducer(history) {
    return combineReducers({
        router:            connectRouter(history),
        addressData:       applyAddressData,
        settingData:       applyGradeSystem,
        classData:         applyClassData,
        subjectData:       applySubjectData,
        studentData:       applyStudentData,
        examData:          applyFilteredExam,
        classListData:     applyClassList,
        tabChangeData:     applyTabChange,
        classDialogData:   applyClassDialog,
        subjectDialogData: applySubjectDialog,
        menuStylingData:   applyMenuStyling,
        gradeData:         applyGradeData,
        graphData:         applyGraphData,
        notesData:         applyNotesData,
        capabilityData:    applyCapabilityChanges,
        calendarData:      applyCalendarChanges
    });
}
