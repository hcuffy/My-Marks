import { toast } from 'react-toastify';
import type { GetState, Dispatch } from '../reducers/types';
import {
         HANDLE_SCHOOL_DATA ,
         HANDLE_SCHOOL_DATA_DISPLAY
       } from './actionTypes';
import { addSchoolData, getSchoolData } from '../database/schoolDB';

export const handleSchoolData = (event) => {
  event.preventDefault();

  const formData = {
    title: event.target.title.value,
    street: event.target.street.value,
    state: event.target.state.value,
    country: event.target.country.value
  }

addSchoolData(formData)
   return {
        type: HANDLE_SCHOOL_DATA,
        payload: formData
    }
};

exports.handleSchoolDataDisplay = () => async (dispatch) => {
   const info = await getSchoolData()
   setTimeout(() => {
     dispatch({
       type: HANDLE_SCHOOL_DATA_DISPLAY,
       payload: {schoolData: info}
     })
   }, 2000);

 }
