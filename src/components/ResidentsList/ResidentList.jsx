import React from 'react'
import Link from 'next/link';


export default function ResidentList({ residents }) {
    return (
        <div>
            <table class="govuk-table  lbh-table"  data-cy="residents-search-table">
                <thead class="govuk-table__head">
                    <tr class="govuk-table__row">
                        <th scope="col" class="govuk-table__header">
                            Name
                        </th>
                        <th scope="col" class="govuk-table__header">
                            Address
                        </th>
                        <th scope="col" class="govuk-table__header">
                            DOB
                        </th>
                        <th scope="col" class="govuk-table__header"></th>
                    </tr>
                </thead>
                <tbody class="govuk-table__body">
                    {residents.map((resident) => {
                        return (
                            <tr class="govuk-table__row">
                                <td class="govuk-table__cell">
                                    {[resident.FirstName, resident.LastName].join(' ')}
                                </td>
                                <td class="govuk-table__cell">
                                    {[
                                        resident.AddressFirstLine,
                                        resident.AddressSecondLine,
                                        resident.PostCode
                                    ].join(', ')}
                                </td>
                                <td class="govuk-table__cell">{resident.DateOfBirth}</td>
                                <td class="govuk-table__cell">
                                <Link
                                    href="/helpcase-profile/[resident_id]"
                                    as={`/helpcase-profile/${resident.resident_id}`}
                                >
                                    <a href="#">View</a>
                                </Link>
                                    {/* <a data-testid="view-button"  href="/oneresident?empty=true" class="js-cta-btn" id={resident.postcode}>View</a> */}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
