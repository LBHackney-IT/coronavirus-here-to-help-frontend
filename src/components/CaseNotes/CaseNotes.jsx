import React, { useEffect, useState } from 'react';
import { helpTypes } from "../../helpers/constants"
import Dropdown from "../../components/Form/Dropdown/Dropdown";
import styles from '../CaseNotes/CaseNotes.module.scss';

export default function CaseNotes({ caseNotes }) {
    const [filterBy, setFilterBy] = useState("")
    useEffect(()=>{
        if(caseNotes?.manageCaseNotePage){
            setFilterBy(caseNotes.helpNeeded)
        }else{
            setFilterBy("All")
        }
    },[])
    const hanleOnChange = (selectedCaseNoteType) => {
        setFilterBy(selectedCaseNoteType)
    }
    return (
        <div>
            <h2 className="govuk-heading-l">Case notes</h2>
            {caseNotes && caseNotes[filterBy]?.length == 0 && 
                <>
                    <div className ={ styles['case-notes-box']}>No previous case notes</div>
                    <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                </>}
                { caseNotes && caseNotes.All.length > 0 && <Dropdown  onChange={(e) => hanleOnChange(e)} dropdownItems ={helpTypes}></Dropdown>}

            { caseNotes && caseNotes[filterBy]?.map((caseNote, i) => {
                return (
                    <>
                        <div
                            key={i}
                            id={`case-note-${i}`}
                            className={`filter ${styles['case-notes-box']}`}
                            data-testid="case-note-entry">
                            <h4 className="govuk-heading-s">
                                {caseNote.formattedDate} by {caseNote.author}
                            </h4>
                            <p>{caseNote.helpNeeded}: {caseNote.note}</p>
                        </div>
                        <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                    </>
                );
            })}
        </div>
    );
}
