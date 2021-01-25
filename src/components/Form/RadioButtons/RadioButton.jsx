import React from 'react'

export default function RadioButton({ radioButtonItems, name , optionalClass, onSelectOption}) {
    return (
        <div class={optionalClass}>
            {radioButtonItems.map((radioButtonItem) => {
                return (
                    <div class="govuk-radios__item">
                        <input
                            class="govuk-radios__input"
                            id={radioButtonItem}
                            name={name}
                            type="radio"
                            value={radioButtonItem}
                            onClick = {(e) => onSelectOption(e.target.value)}
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
