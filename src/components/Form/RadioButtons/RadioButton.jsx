import React from 'react'

export default function RadioButton({ radioButtonItems, name , optionalClass, onSelectOption}) {
    const handleOnSelectOption = (value) =>{
        if(onSelectOption){
            onSelectOption(value)
        } 
    }
    return (
        <div class={optionalClass}>
            {radioButtonItems.map((radioButtonItem) => {
                return (
                    <div className="govuk-radios__item">
                        <input
                            className="govuk-radios__input"
                            id={radioButtonItem}
                            name={name}
                            type="radio"
                            value={radioButtonItem}
                            onClick = {(e) => handleOnSelectOption(e.target.value)}
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
