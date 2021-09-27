import React from 'react';
import { WELFARE_CALL } from '../../../helpers/constants';

export default function RadioButton({
    radioButtonItems,
    name,
    optionalClass,
    onSelectOption,
    ...otherProps
}) {
    const handleOnSelectOption = (value) => {
        if (onSelectOption) {
            onSelectOption(value);
        }
    };
    return (
        <div className={optionalClass}>
            {radioButtonItems.map((radioButtonItem) => {
                const elementId = radioButtonItem.replace(/\s+/g, '-').toLowerCase();

                return (
                    <div className="govuk-radios__item">
                        <input
                            className="govuk-radios__input"
                            id={elementId}
                            name={name}
                            type="radio"
                            value={radioButtonItem}
                            onClick={(e) => handleOnSelectOption(e.target.value)}
                            {...otherProps}
                        />
                        <label
                            className="govuk-label govuk-radios__label"
                            htmlFor={radioButtonItem}
                            for={elementId}
                            style={{ marginBottom: '15px' }}>
                            {radioButtonItem == WELFARE_CALL ? 'Self Isolation' : radioButtonItem}
                        </label>
                    </div>
                );
            })}
        </div>
    );
}
