import React from "react";

export default function Dropdown({ onChange, dropdownItems, ...otherProps }) {
  return (
    <div>
      <select
        class="govuk-select"
        onChange={(e) => onChange(e.target.value)}
        {...otherProps}
      >
        {dropdownItems.map((dropdownItem) => {
          return (
            <option id={dropdownItem} value={dropdownItem}>
              {dropdownItem}
            </option>
          );
        })}
      </select>
    </div>
  );
}
