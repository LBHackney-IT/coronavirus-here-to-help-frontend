import React from 'react';

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
    <div class="govuk-checkboxes__item">
        <input 
            type="checkbox"
            label={label}
            checked={isSelected}
            onChange={onCheckboxChange}
            class="govuk-checkboxes__input"
        />
        <label class="govuk-label govuk-checkboxes__label">
        {label}
        </label>
    </div>
);

export default Checkbox;