import React from 'react';
import Layout from '../../../components/layout';
import SupportTable from '../../../components/SupportTable/SupportTable';
import KeyInformation from '../../../components/KeyInformation/KeyInformation';
import Link from 'next/link';
import { Button } from '../../../components/Form';
import { ResidentGateway } from '../../../gateways/resident';
import { HelpRequestGateway } from '../../../gateways/help-request';
import CallHistory from '../../../components/CallHistory/CallHistory';
import CaseNotes  from "../../../components/CaseNotes/CaseNotes";
import { useState, useEffect } from 'react';
import { helpTypes } from "../../../helpers/constants";
import { isJSON, formatDate, getAuthor, getDate, getNote, getNonJsonCasenotesArray } from "../../../helpers/case_notes_helper";

export default function HelpcaseProfile({ residentId }) {
    const [resident, setResident] = useState([]);
    const [helpRequests, setHelpRequests] = useState([]);
    const [caseNotes, setCaseNotes] = useState({
        "All":[],
        "Welfare Call":[],
        "Help Requesst":[],
        "Contact Tracing":[],
        "CEV":[]
    })

    const getResidentAndHelpRequests = async () => {
        try {
            const gateway = new ResidentGateway();
            const resident = await gateway.getResident(residentId);
            const hrGateway = new HelpRequestGateway();
            const helpRequests = await hrGateway.getHelpRequests(residentId);
            let categorisedCaseNotes = {"All":[],
                                        "Welfare Call":[],
                                        "Help Request":[],
                                        "Contact Tracing":[],
                                        "CEV":[]}
            helpRequests.forEach(hr => {
                if(!hr.caseNotes) return
                if(isJSON(hr.caseNotes)){
                    let caseNoteObject = JSON.parse(hr.caseNotes)
                    if(caseNoteObject.length > 1){
                        caseNoteObject.forEach(note => {
                            note.formattedDate = formatDate(note.noteDate)
                            note.helpNeeded = hr.helpNeeded
                            categorisedCaseNotes[hr.helpNeeded].push(note)
                            categorisedCaseNotes['All'].push(note)
                        });
                    }else{
                        caseNoteObject[0].formattedDate = formatDate(caseNoteObject[0].noteDate)
                        caseNoteObject[0].helpNeeded = hr.helpNeeded
                        categorisedCaseNotes[hr.helpNeeded].push(caseNoteObject[0])
                        categorisedCaseNotes['All'].push(caseNoteObject[0])
                    }
                }
                else if(!isJSON(hr.caseNotes)){
                    let nonJsonCaseNotesArray = getNonJsonCasenotesArray(hr.caseNotes)
                    nonJsonCaseNotesArray.forEach(nonJsonCaseNote => {
                        if (nonJsonCaseNote) {
                            let caseNoteObject = {"author": getAuthor(nonJsonCaseNote),
                                                        "formattedDate": formatDate(getDate(nonJsonCaseNote)),
                                                        "note": getNote(nonJsonCaseNote),
                                                        "helpNeeded":hr.helpNeeded,
                                                        "noteDate": getDate(nonJsonCaseNote)
                                                        }
                            categorisedCaseNotes[hr.helpNeeded].push(caseNoteObject) 
                            categorisedCaseNotes.All.push(caseNoteObject)
                        }
                    });
                }
                helpTypes.forEach(helpType => {
                    categorisedCaseNotes[helpType].sort((a, b) => new Date(b.noteDate) - new Date(a.noteDate))
                });
            });
            setCaseNotes(categorisedCaseNotes)
            setResident(resident);
            setHelpRequests(helpRequests);
        } catch (err) {
            console.log(`Error getting resident props with help request ID ${residentId}: ${err}`);
        }
    };
    function useEffectAsync(effect, inputs) {
        useEffect(() => {
            effect();
        }, inputs);
    }

    useEffectAsync(getResidentAndHelpRequests, []);


    const calls = [].concat
        .apply([], helpRequests.map(helpRequest => helpRequest.helpRequestCalls))
        .sort((a,b) => new Date(b.callDateTime) - new Date(a.callDateTime))

    return (
        resident && (
            <Layout>
                <div>
                    <a
                        href="/callback-list"
                        className="govuk-back-link"
                        style={{
                            marginTop: '-40px',
                            display: 'block',
                            borderBottom: 'none'
                        }}>
                        Back
                    </a>
                    <div className="govuk-grid-row">
                        <div className="govuk-grid-column-one-quarter-from-desktop">
                            <KeyInformation resident={resident} />
                        </div>

                        <div className="govuk-grid-column-three-quarters-from-desktop">
                            <h1
                                className="govuk-heading-xl"
                                data-testid="resident-name_header">
                                {resident.firstName} {resident.lastName}
                            </h1>

                        <SupportTable helpRequests={helpRequests} />
                        <Link href="/add-support/[residentId]" as={`/add-support/${residentId}`}>
                            <Button data-testid='add-support-button'text="+ Add new support" />
                        </Link>

                            <hr />

                            <br />
                            <CallHistory calls={calls}  />
                            <CaseNotes caseNotes={caseNotes}/>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    );
}

HelpcaseProfile.getInitialProps = async ({ query: { residentId }, req, res }) => {
    return {
        residentId
    };
};
