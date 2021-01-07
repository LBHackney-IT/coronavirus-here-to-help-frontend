import { useRouter } from "next/router";
import React from 'react';

export default function residents() {
    const router = useRouter();
    const supportType = [{hr:"Help Request", cev:"CEV", welfare:"Welfare", shield:"Shielding", ct:"Contact tracing"}];

    console.log(supportType.hr)
    return (
        <div>
            <a href="#" onClick={() => router.back()}>Back</a>
            <h1>Callback list</h1>
            <br />
            <h3 class="lbh-heading-h3">Filter by Help Type:</h3>
            <select>
            { supportType.map((key, value) => (
                <option key={key} value={value}>Call type</option>
            ))}
                
            </select>

            <br />

<p class="lbh-body-m">Displaying 2 record(s)</p>

<span hidden="true"></span>
<table class="govuk-table  lbh-table">
    <thead class="govuk-table__head">
        <tr class="govuk-table__row">
            <th scope="col" class="govuk-table__header">Name</th>
            <th scope="col" class="govuk-table__header">Address</th>
            <th scope="col" class="govuk-table__header">Requested Date</th>
            <th scope="col" class="govuk-table__header">Type</th>
            <th scope="col" class="govuk-table__header">Unsuccessful call attempts</th>
            <th scope="col" class="govuk-table__header">Follow-up required</th>
            <th scope="col" class="govuk-table__header">Assigned to</th>
            <th scope="col" class="govuk-table__header">Rescheduled at</th>
            <th scope="col" class="govuk-table__header"></th>
        </tr>
    </thead>
    <tbody class="govuk-table__body">
                    <tr class="govuk-table__row">
                        <td class="govuk-table__cell">
                            First name
                        </td>
                        <td class="govuk-table__cell">
                            test
                        </td>
                        <td class="govuk-table__cell">13:23</td>
                        <td class="govuk-table__cell"><span title="<?=HereToHelp\Helper::$support_type[$support_type]?>">ct</span></td>
                        <td class="govuk-table__cell ">name</td>
                        <td class="govuk-table__cell">name</td>
                        <td class="govuk-table__cell"><a href="/singleassign" title="<?=HereToHelp\Helper::$fake_users[$initial]?>">jh✎</a></td>
                        <td class="govuk-table__cell">name</td>
                        <td class="govuk-table__cell">
                            <a data-testid="view-button" href="/oneresident?id=18" class="js-cta-btn" id="view-resident-18">View</a>
                        </td>
                    </tr>
            </tbody>
        </table>
            
        </div>
    )
}



