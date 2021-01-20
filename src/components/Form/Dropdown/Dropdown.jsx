import React from "react";

export default function Dropdown({ onChange, dropdownItems, ...otherProps }) {
  return (
    <div>
      <select
        class="govuk-select"
        onChange={(e) => onChange(e.target.value)}
        {...otherProps}
      >
        {dropdownItems.map((dropdownItem, index) => {
          return (
            <option key={index} value={dropdownItem}>
              {dropdownItem}
            </option>
          );
        })}
      </select>
    </div>
  );
}
