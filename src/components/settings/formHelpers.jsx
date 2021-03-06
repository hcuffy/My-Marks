import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {Button, Intent, Radio, RadioGroup, FormGroup, InputGroup} from '@blueprintjs/core';

import {filteredAddressData} from '../helpers';
import {saveSchoolAddress, updateGradingSystem} from './actions';
import css from './style.css';

function AddressFields({t, addressData}) {
    const address = filteredAddressData(addressData);

    return _.keys(address).map((data, idx) => (
        <div key={idx} className={css.form_inner_div}>
            <FormGroup className={css.align_input} labelFor={`school${data}`} inline={true} label={t(`settings.${data}`)}>

                <InputGroup
                    name={data}
                    id={`school${data}`}
                    type='text'
                    defaultValue={address[data]}
                    placeholder= {t(`settings.${data}`)}
                />
            </FormGroup>
        </div>
    ));
}

function AddressFormComponent({t, addressData, saveSchoolAddress}) {
    return (
        <form onSubmit={saveSchoolAddress} method='POST'>
            <div className={css.form_outer_div}>

                <AddressFields t={t} addressData={addressData}/>

                <div className={`${css.form_inner_div} ${css.save_btn}`}>
                    <Button type='submit' intent={Intent.SUCCESS} text={t('general.save')}/>
                </div>
            </div>
        </form>
    );
}

export const AddressForm = connect(
    state => ({
        addressData: state.addressData
    }), {saveSchoolAddress}
)(withTranslation()(AddressFormComponent));

export function gradingSystem(settings) {
    return _.findKey(settings, gradeType => gradeType === true);
}

function RadioButtonsComponent({t, addressData, updateGradingSystem}) {
    const selectedValue = gradingSystem(_.pick(addressData, ['note', 'points', 'percent']));

    return (
        <RadioGroup inline={false} name='settings' selectedValue={selectedValue} onChange={updateGradingSystem}>
            <Radio label={t('settings.note')} value='note'/>
            <Radio label={t('settings.points')} value='points'/>
            <Radio label={t('settings.percent')} value='percent'/>
        </RadioGroup>);
}

export const GradeSelector = connect(
    state => ({
        addressData: state.addressData
    }), {updateGradingSystem}
)(withTranslation()(RadioButtonsComponent));
