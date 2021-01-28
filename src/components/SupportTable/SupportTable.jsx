import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function SupportTable({helpRequests}) {
	return (
		<div className="govuk-tabs" data-module="govuk-tabs">
			<h2 className="govuk-tabs__title govuk-heading-l">Contents</h2>
			<ul className="govuk-tabs__list">
				<li className="govuk-tabs__list-item govuk-tabs__list-item--selected">
					<a className="govuk-tabs__tab" href="#past-day">
						Support Requested
					</a>
				</li>
				<li className="govuk-tabs__list-item govuk-tabs__list-item--selected">
					<a className="govuk-tabs__tab" href="#past-week">
						Support Received
					</a>
				</li>
			</ul>
			<div className="govuk-tabs__panel" id="past-day">
				<table className="govuk-table">
					<thead className="govuk-table_header">
						<tr className="govuk-table__row">
							<th className="govuk-table__header">Type</th>
							<th className="govuk-table__header">Action required</th>
							<th className="govuk-table__header">Call Attempts</th>
							<th className="govuk-table__header"></th>
						</tr>
					</thead>
					<tbody className="govuk-table__body">
						{helpRequests.map((helpRequest, index) => {
						return	<tr className="govuk-table__row" key={`help-request-${index}`} data-testid="support-requested-table_row">
							<td scope="row" className="govuk-table__cell" data-testid="support-requested-table-help-needed">
								{helpRequest.helpNeeded}
							</td>
							<td className="govuk-table__cell">{helpRequest.callbackRequired && <>Callback</>}</td>
							<td className="govuk-table__cell" data-testid="support-requested-table-calls-count">{helpRequest.helpRequestCalls?.length}</td>
							<td className="govuk-table__cell govuk-table__cell--numeric"  data-testid={`support-requested-table-view_link-${index}`}>
								<Link
									href="/helpcase-profile/[resident_id]/manage-request/[help_request]"
									as={`/helpcase-profile/${helpRequest.residentId}/manage-request/${helpRequest.id}`}>View</Link>
							</td>
						</tr>})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
