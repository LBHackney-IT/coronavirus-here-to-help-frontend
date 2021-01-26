import React from 'react';
import Link from 'next/link';
import { isoDateToOtherDate } from '../../helpers/utilityFuncs';

const calcInitials = (fullname) =>
    fullname
        .split(' ')
        .map((n) => n[0])
        .join('');

const notAssignedOrValue = (text) => {
    return text != '' ? text : 'Not assigned';
};

export default function CallbacksList({ callbacks }) {
    return (
        <>
            <p className="govuk-body govuk-!-margin-bottom-1">
                Displaying {callbacks.length} record(s)
            </p>

            <table className="govuk-table" data-cy="callbacks-table">
                <thead className="govuk-table__head">
                    <tr className="govuk-table__row">
                        <th scope="col" className="govuk-table__header">
                            Name
                        </th>
                        <th scope="col" className="govuk-table__header">
                            Address
                        </th>
                        <th scope="col" className="govuk-table__header">
                            Requested Date
                        </th>
                        <th scope="col" className="govuk-table__header">
                            Type
                        </th>
                        <th scope="col" className="govuk-table__header">
                            Unsuccessful call attempts
                        </th>
                        <th scope="col" className="govuk-table__header">
                            Follow-up required
                        </th>
                        <th scope="col" className="govuk-table__header">
                            Assigned to
                        </th>
                        <th scope="col" className="govuk-table__header">
                            Rescheduled at
                        </th>
                        <th scope="col" className="govuk-table__header"></th>
                    </tr>
                </thead>
                <tbody className="govuk-table__body">
                    {callbacks.map((callback, index) => {
                        return (
                            <tr
                                className="govuk-table__row"
                                key={index}
                                data-cy={`r-${callback.helpRequestId}`}>
                                <td className="govuk-table__cell">{callback.residentName}</td>
                                <td className="govuk-table__cell">{callback.address}</td>
                                <td className="govuk-table__cell">{callback.requestedDate}</td>
                                <td className="govuk-table__cell">
                                    <span title="Contact Tracing">{callback.callType}</span>
                                </td>
                                <td className="govuk-table__cell ">
                                    {callback.unsuccessfulCallAttempts}
                                </td>
                                <td className="govuk-table__cell">
                                    {callback.followUpRequired ? 'Yes' : 'No'}
                                </td>
                                <td className="govuk-table__cell">
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
                                        <a href="#" title={notAssignedOrValue(callback.assignedTo)}>
                                            {notAssignedOrValue(calcInitials(callback.assignedTo))}✎
                                        </a>
                                    </Link>
                                </td>
                                <td className="govuk-table__cell">{callback.rescheduledAt}</td>
                                <td className="govuk-table__cell">
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
