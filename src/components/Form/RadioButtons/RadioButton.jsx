import React from 'react'

export default function RadioButton({ radioButtonItems, name }) {
    return (
        <div className="govuk-radios govuk-radios--inline">
            {radioButtonItems.map((radioButtonItem) => {
                return (
                    <div className="govuk-radios__item">
                        <input
                            className="govuk-radios__input"
                            id={radioButtonItem}
                            name={name}
                            type="radio"
                            value={radioButtonItem}
                        />
                        <label
                            className="govuk-label govuk-radios__label"
                            htmlFor={radioButtonItem}
                            style={{marginBottom: "15px"}}
                        >
                            {radioButtonItem}
                        </label>
                </div>
                )
            })}
        </div>
    )
}
