import React from 'react';
import {withTranslation} from 'react-i18next';

import CapabilityDropdown from './CapabilityDropdown';
import CapabilityCards from './CapabilityCollapsible';
import css from './style.css';

function CapabilitySection({t}) {
    return (
        <div className={css.capability_wrapper}>
            <h4 className={css.main_header}>{t('capability.sectionTitle')}</h4>
            <CapabilityDropdown t={t}/>
            <CapabilityCards/>
        </div>
    );
}

export default withTranslation()(CapabilitySection);
