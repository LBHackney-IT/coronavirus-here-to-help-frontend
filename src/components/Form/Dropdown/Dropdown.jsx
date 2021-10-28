import React from 'react';
import { WELFARE_CALL } from '../../../helpers/constants';

export default function Dropdown({
    onChange,
    dropdownItems,
    label,
    name,
    defaultValue,
    ...otherProps
}) {
    return (
        <div>
            {label && (
                <label className="govuk-label" htmlFor={name ?? label}>
                    {label}
                </label>
            )}
            <select
                className="govuk-select"
                data-testid="select-dropdown"
                onChange={(e) => onChange(e.target.value)}
                {...otherProps}>
                {dropdownItems.map((dropdownItem, index) => {
                    return defaultValue == dropdownItem ? (
                        <option key={index} value={dropdownItem} selected>
                            {dropdownItem == WELFARE_CALL ? 'Self Isolation' : dropdownItem}
                        </option>
                    ) : (
                        <option key={index} value={dropdownItem}>
                            {dropdownItem == WELFARE_CALL ? 'Self Isolation' : dropdownItem}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
