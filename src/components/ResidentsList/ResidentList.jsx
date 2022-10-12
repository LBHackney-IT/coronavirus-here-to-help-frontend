import React from 'react';
import Link from 'next/link';

export default function ResidentList({ residents }) {
    return (
        <div>
            <table className="govuk-table  lbh-table" data-testid="residents-search-table">
                <thead className="govuk-table__head">
                    <tr className="govuk-table__row">
                        <th scope="col" className="govuk-table__header">
                            Name
                        </th>
                        <th scope="col" className="govuk-table__header">
                            Address
                        </th>
                        <th scope="col" className="govuk-table__header">
                            DOB
                        </th>
                        <th scope="col" className="govuk-table__header"></th>
                    </tr>
                </thead>
                <tbody className="govuk-table__body">
                    {residents.map((resident, index) => {
                        return (
                            <tr key={"reslistrow-" + index} className="govuk-table__row">
                                <td className="govuk-table__cell">
                                    {[resident.firstName, resident.lastName].join(' ')}
                                </td>
                                <td className="govuk-table__cell">
                                    {[
                                        resident.addressFirstLine,
                                        resident.addressSecondLine,
                                        resident.postCode
                                    ].join(', ')}
                                </td>
                                <td className="govuk-table__cell">{resident.dateOfBirth}</td>
                                <td className="govuk-table__cell">
                                    <Link
                                        href="/helpcase-profile/[resident_id]"
                                        as={`/helpcase-profile/${resident.id}`}>
                                        <a href="#">View</a>
                                    </Link>
                                    {/* <a data-testid="view-button"  href="/oneresident?empty=true" className="js-cta-btn" id={resident.postcode}>View</a> */}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
