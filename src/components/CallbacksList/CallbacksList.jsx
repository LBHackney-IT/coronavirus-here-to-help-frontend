import React from 'react';
import Link from 'next/link';
import { isoDateToOtherDate } from '../../helpers/utilityFuncs';

const calcInitials = (fullname) =>
    fullname
        .split(' ')
        .map((n) => n[0])
        .join('');

export default function CallbacksList({ callbacks }) {
    return (
        <>
            <p class="govuk-body govuk-!-margin-bottom-1">
                Displaying {callbacks.length} record(s)
            </p>

            <table class="govuk-table" data-cy="callbacks-table">
                <thead class="govuk-table__head">
                    <tr class="govuk-table__row">
                        <th scope="col" class="govuk-table__header">
                            Name
                        </th>
                        <th scope="col" class="govuk-table__header">
                            Address
                        </th>
                        <th scope="col" class="govuk-table__header">
                            Requested Date
                        </th>
                        <th scope="col" class="govuk-table__header">
                            Type
                        </th>
                        <th scope="col" class="govuk-table__header">
                            Unsuccessful call attempts
                        </th>
                        <th scope="col" class="govuk-table__header">
                            Follow-up required
                        </th>
                        <th scope="col" class="govuk-table__header">
                            Assigned to
                        </th>
                        <th scope="col" class="govuk-table__header">
                            Rescheduled at
                        </th>
                        <th scope="col" class="govuk-table__header"></th>
                    </tr>
                </thead>
                <tbody class="govuk-table__body">
                    {callbacks.map((callback, index) => {
                        return (
                            <tr
                                class="govuk-table__row"
                                key={index}
                                data-cy={`r-${callback.helpRequestId}`}>
                                <td class="govuk-table__cell">{callback.residentName}</td>
                                <td class="govuk-table__cell">{callback.address}</td>
                                <td class="govuk-table__cell">
                                    {isoDateToOtherDate(callback.requestedDate)}
                                </td>
                                <td class="govuk-table__cell">
                                    <span title="Contact Tracing">{callback.type}</span>
                                </td>
                                <td class="govuk-table__cell ">
                                    {callback.unsuccessfulCallAttempts}
                                </td>
                                <td class="govuk-table__cell">
                                    {callback.followUpRequired ? 'Yes' : 'No'}
                                </td>
                                <td class="govuk-table__cell">
                                    <Link
                                        href={{
                                            pathname:
                                                '/reassign-call/[requestId]?residentId=:[residentId]',
                                            query: {
                                                requestId: callback.helpRequestId,
                                                residentId: callback.residentId
                                            }
                                        }}
                                        as={`/reassign-call/${callback.helpRequestId}?residentId=${callback.residentId}`}>
                                        <a href="#" title={callback.assignedTo}>
                                            {calcInitials(callback.assignedTo)}✎
                                        </a>
                                    </Link>
                                </td>
                                <td class="govuk-table__cell">{callback.rescheduledAt}</td>
                                <td class="govuk-table__cell">
                                    <Link
                                        href="/helpcase-profile/[residentId]"
                                        as={`/helpcase-profile/${callback.residentId}`}>
                                        <a href="#">View</a>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
