import React from 'react';
import {WELFARE_CALL} from '../../../helpers/constants';

const Checkbox = ({ label, isSelected, onCheckboxChange, value, containerStyle, ...others }) => (
    <div className="govuk-checkboxes__item" style={containerStyle}>
        <input
            type="checkbox"
            label={label}
            checked={isSelected}
            value={value}
            onChange={(e) => onCheckboxChange(e.target.value)}
            className="govuk-checkboxes__input"
            {...others}
        />
        <label className="govuk-label govuk-checkboxes__label">
            {label == WELFARE_CALL ? 'Self Isolation' : label}
        </label>
    </div>
);

export default Checkbox;
