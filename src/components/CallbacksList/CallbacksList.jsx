import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const calcInitials = (fullname) =>
  fullname
    .split(" ")
    .map((n) => n[0])
    .join("");

export default function CallbacksList({ callbacks }) {
  return (
    <>
      <p class="govuk-body govuk-!-margin-bottom-1">
        Displaying {callbacks.length} record(s)
      </p>

      <table class="govuk-table">
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
              <tr class="govuk-table__row" key={index}>
                <td class="govuk-table__cell">{callback.resident_name}</td>
                <td class="govuk-table__cell">{callback.address}</td>
                <td class="govuk-table__cell">{callback.requested_date}</td>
                <td class="govuk-table__cell">
                  <span title="Contact Tracing">{callback.type}</span>
                </td>
                <td class="govuk-table__cell ">
                  {callback.unsuccessful_call_attempts}
                </td>
                <td class="govuk-table__cell">{callback.follow_up_required}</td>
                <td class="govuk-table__cell">
                  <a href="/reassign-call" title={callback.assigned_to}>
                    {calcInitials(callback.assigned_to)}✎
                  </a>
                </td>
                <td class="govuk-table__cell">{callback.rescheduled_at}</td>
                <td class="govuk-table__cell">
                  <Link
                    href="/helpcase-profile/[helpr_id]"
                    as={`/helpcase-profile/${callback.id}`}
                  >
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
