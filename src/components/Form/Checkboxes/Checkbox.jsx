import React from 'react';

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
    <div className="govuk-checkboxes__item">
        <input 
            type="checkbox"
            label={label}
            checked={isSelected}
            onChange={onCheckboxChange}
            className="govuk-checkboxes__input"
        />
        <label className="govuk-label govuk-checkboxes__label">
        {label}
        </label>
    </div>
);

export default Checkbox;