import React from 'react';

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
            {label == 'Welfare Call' ? 'Self Isolation' : label}
        </label>
    </div>
);

export default Checkbox;
