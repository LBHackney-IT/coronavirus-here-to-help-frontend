import React from 'react';

export default function Dropdown({ onChange, dropdownItems, label, name, ...otherProps }) {
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
                    return (
                        <option key={index} value={dropdownItem}>
                            {dropdownItem == 'Welfare Call' ? 'Self Isolation' : dropdownItem}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
