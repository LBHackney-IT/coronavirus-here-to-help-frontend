import React from 'react';

export default function Dropdown({ dropdownItems }) {
    return (
        <div>
            <select class="govuk-select">
            {dropdownItems.map(dropdownItem => {
                return (
                    <option 
                            id={dropdownItem} 
                            value={dropdownItem}>{dropdownItem}
                    </option>
                );
             })
            }
            </select>
        </div>
    )
}
