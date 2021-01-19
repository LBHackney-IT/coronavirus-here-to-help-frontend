import React from 'react'

export default function RadioButton({ radioButtonItems }) {
    return (
        radioButtonItems.map((radioButtonItem) => {
            return (
                <div class="govuk-radios govuk-radios--inline">
                <div class="govuk-radios__item">
                    <input
                        class="govuk-radios__input"
                        id={radioButtonItem}
                        name={radioButtonItem}
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
            </div>
            )
        })
    )
}
