import React from 'react';
import { Button, Dropdown } from '../Form';
import { useState } from 'react';

export default function CaseNotes({ helpRequests }) {
    const supportTypes = ['Help Request', 'CEV', 'Welfare', 'Shielding', 'Contact Tracing'];

    const [selectedSupportType, setSelectedSupportType] = useState();

    const onChange = (value) => {
        setSelectedSupportType(value);
    };

    return (
        <div>
            <h2 className="govuk-heading-l">Case notes</h2>
            <Dropdown
                onChange={(value) => onChange(value)}
                dropdownItems={Object.values(supportTypes)}
            />
            {helpRequests.map((hr, i) => {
                return hr.caseNotes?.map((note, x) => {
                    return (
                        (!selectedSupportType || selectedSupportType == hr.helpNeeded) && (
                            <>
                                <div
                                    style={{
                                        backgroundColor: 'rgba(220, 233, 213, 1)',
                                        padding: '20px',
                                        marginTop: '20px'
                                    }}
                                    id={`case-note-${note.id}`}
                                    className="filter">
                                    <h4 className="govuk-heading-s" className="filter">
                                        {note.createdAt}
                                    </h4>
                                    <p>
                                        {hr.helpNeeded}: {note.caseNote}
                                    </p>
                                </div>
                                <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                            </>
                        )
                    );
                });
            })}
        </div>
    );
}
