import React from 'react';

export default function SingleRadioButton({ radioButtonItem, onSelectOption, ...otherProps }) {
    const handleOnSelectOption = (value) => {
        if (onSelectOption) {
            onSelectOption(value);
        }
    };
    const elementId = radioButtonItem.replace(/\s+/g, '-').toLowerCase();
    return (
        <div className="govuk-radios__item">
            <input
                className="govuk-radios__input"
                id={elementId}
                type="radio"
                value={radioButtonItem}
                onClick={(e) => handleOnSelectOption(e.target.value)}
                {...otherProps}
            />
            <label
                className="govuk-label govuk-radios__label"
                htmlFor={elementId}
                style={{ marginBottom: '15px' }}>
                {radioButtonItem}
            </label>
        </div>
    );
}
