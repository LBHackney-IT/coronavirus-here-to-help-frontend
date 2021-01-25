import React from "react";

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
						return	<tr className="govuk-table__row" key={`help-request-${index}`}>
							<td scope="row" className="govuk-table__cell">
								{helpRequest.helpNeeded}
							</td>
							<td className="govuk-table__cell">{helpRequest.callbackRequired && <>Callback</>}</td>
							<td className="govuk-table__cell">{helpRequest.helpRequestCalls?.length}</td>
							<td className="govuk-table__cell govuk-table__cell--numeric">
								<a href="/helpcase-profile/1/call-starter">View</a> {/* Will filter case notes accordingly  */}
							</td>
						</tr>})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
