import React from 'react';
import { Button, Dropdown } from '../Form';

export default function CaseNotes() {
    const fakeUsers = ["Annalivia Ryan", "Ben Dalton", "Liudvikas T", "Marten Wetterberg"];
    const supportTypes = {"hr": "Help Request", "cev": "CEV", "welfare": "Welfare", "shield": "Shielding", "ct": "Contact tracing"};

    return (
        <div>
            <h2 class="govuk-heading-l">Case notes</h2>
        <Dropdown dropdownItems={Object.values(supportTypes)} /> 
        <br />  

        {fakeUsers.map((fakeUser, index) => {
            return (
            <>
            <h4>2020-01-0{index} by {fakeUser}</h4>
            <p>Random Text</p>
            <hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
            </>
        )})} 

            <p>
                {/* {type: caseNote} */}
            </p>

        </div>
    )
}



