import React from 'react';

export default function CaseNotes({ caseNotes }) {
    return (
        <div>
            <h2 className="govuk-heading-l">Case notes</h2>
            {caseNotes?.map((note, i) => {
                return (
                    <>
                        <div
                            key={i}
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
                            <p>{note.caseNote}</p>
                        </div>
                        <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                    </>
                );
            })}
        </div>
    );
}
