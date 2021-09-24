import React, { useEffect, useState } from 'react';
import { helpTypes, WELFARE_CALL } from '../../helpers/constants';
import Dropdown from '../../components/Form/Dropdown/Dropdown';
import styles from '../CaseNotes/CaseNotes.module.scss';
import { useRouter } from 'next/router';
import { formatSubText } from '../../helpers/formatter';

export default function CaseNotes({ caseNotes }) {
    const [filterBy, setFilterBy] = useState('');
    const [displayDropdown, setDisplayDropDown] = useState(true);
    const router = useRouter();
    useEffect(() => {
        if (router.pathname.includes('manage-request')) {
            setDisplayDropDown(false);
        }

        if (caseNotes?.helpType) {
            setFilterBy(caseNotes.helpType);
        } else {
            setFilterBy('All');
        }
    }, [caseNotes]);
    const hanleOnChange = (selectedCaseNoteType) => {
        setFilterBy(
            selectedCaseNoteType == 'Self Isolation' ? 'Welfare Call' : selectedCaseNoteType
        );
    };
    return (
        <div>
            <h2 className="govuk-heading-l">Case notes</h2>

            {caseNotes && !caseNotes.helpType && displayDropdown && (
                <Dropdown
                    onChange={(e) => hanleOnChange(e)}
                    dropdownItems={helpTypes
                        .join(',')
                        .replace('Welfare Call', 'Self Isolation')
                        .split(',')}></Dropdown>
            )}
            {caseNotes && caseNotes[filterBy]?.length == 0 && (
                <>
                    <div className={styles['case-notes-box']}>No previous case notes</div>
                    <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                </>
            )}

            {caseNotes &&
                caseNotes[filterBy]?.map((caseNote, i) => {
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
                                <p>
                                    {caseNote.helpNeeded == WELFARE_CALL
                                        ? 'Self Isolation'
                                        : formatSubText(
                                              caseNote.helpNeeded,
                                              caseNote.helpNeededSubtype
                                          )}
                                    : {caseNote.note}
                                </p>
                            </div>
                            <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                        </>
                    );
                })}
        </div>
    );
}
