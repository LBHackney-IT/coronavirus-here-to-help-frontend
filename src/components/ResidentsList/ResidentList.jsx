import React from 'react'

export default function ResidentList({ residents }) {
    return (
        <div>
            <table class="govuk-table  lbh-table">
                <thead class="govuk-table__head">
                    <tr class="govuk-table__row">
                    <th scope="col" class="govuk-table__header">Name</th>
                    <th scope="col" class="govuk-table__header">Address</th>
                    <th scope="col" class="govuk-table__header">DOB</th>
                    <th scope="col" class="govuk-table__header"></th>
                    </tr>
                </thead>
                    <tbody class="govuk-table__body">
                        {residents.map(resident => {
                            return (
                                <tr class="govuk-table__row">
                                <td class="govuk-table__cell">
                                    {[resident.first_name, resident.last_name].join(" ")}
                                </td>
                                <td class="govuk-table__cell">
                                    {[resident.address_first_line, resident.address_second_line, resident.postcode].join(", ")}
                                </td>
                                <td class="govuk-table__cell">{resident.date_of_birth}</td>
                                <td class="govuk-table__cell">
                                    <a data-testid="view-button"  href="/oneresident?empty=true" class="js-cta-btn" id={resident.postcode}>View</a>
                                </td>
                            </tr>
                            )
                            } 
                        )}
                    </tbody>
            </table>
        </div>
    )
}
