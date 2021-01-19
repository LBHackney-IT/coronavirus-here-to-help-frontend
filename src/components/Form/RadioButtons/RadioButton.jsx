import React from 'react'

export default function RadioButton({ radioButtonItems, name }) {
    return (
        <div class="govuk-radios govuk-radios--inline">
            {radioButtonItems.map((radioButtonItem) => {
                return (
                    <div class="govuk-radios__item">
                        <input
                            class="govuk-radios__input"
                            id={radioButtonItem}
                            name={name}
                            type="radio"
                            value={radioButtonItem}
                        />
                        <label
                            class="govuk-label govuk-radios__label"
                            for={radioButtonItem}
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
