import React from 'react';
import Link from 'next/link';
import { NOT_ASSIGNED, CONTACT_TRACING, WELFARE_CALL } from '../../helpers/constants';

const calcInitials = (fullname) =>
    fullname
        .split(' ')
        .map((n) => n[0])
        .join('');

const notAssignedOrValue = (text) => {
    return text !== '' ? text : NOT_ASSIGNED;
};

export default function CallbacksList({ callbacks }) {
    return (
        <>
            <p className="govuk-body govuk-!-margin-bottom-1">
                Displaying {callbacks.length} record(s)
            </p>

            <table className="govuk-table" data-testid="callbacks-table">
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
                            CTAS Id
                        </th>
                        <th scope="col" className="govuk-table__header"></th>
                    </tr>
                </thead>
                <tbody className="govuk-table__body">
                    {callbacks.map((callback, index) => {
                        return (
                            <tr
                                className="govuk-table__row"
                                key={`callbacks-list_row-${index}`}
                                data-testid="callbacks-table_row">
                                <td className="govuk-table__cell">{callback.residentName}</td>
                                <td className="govuk-table__cell">{callback.address}</td>
                                <td className="govuk-table__cell">{callback.requestedDate}</td>
                                <td
                                    className="govuk-table__cell"
                                    data-testid="callbacks-table-call-type">
                                    <span title="Contact Tracing">
                                        {callback.callType == WELFARE_CALL
                                            ? 'Self Isolation'
                                            : callback.callType}
                                    </span>
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
                                        <a
                                            href="#"
                                            title={notAssignedOrValue(callback.assignedTo || '')}
                                            data-testid="callbacks-table-assigned-to_link">
                                            {notAssignedOrValue(
                                                calcInitials(callback.assignedTo || '')
                                            )}
                                            ✎
                                        </a>
                                    </Link>
                                </td>
                                <td className="govuk-table__cell">
                                    {callback.callType === CONTACT_TRACING
                                        ? callback.nhsCtasId
                                        : 'N/A'}
                                </td>
                                <td className="govuk-table__cell">
                                    <Link
                                        href="/helpcase-profile/[residentId]"
                                        as={`/helpcase-profile/${callback.residentId}`}>
                                        <a
                                            href="#"
                                            data-testid={`callbacks-list-view_link-${index}`}>
                                            View
                                        </a>
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
