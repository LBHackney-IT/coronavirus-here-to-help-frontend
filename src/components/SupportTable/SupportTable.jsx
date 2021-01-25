import React from "react";

export default function SupportTable() {
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
							<th className="govuk-table__header"></th>
						</tr>
					</thead>
					<tbody className="govuk-table__body">
						<tr className="govuk-table__row">
							<td scope="row" className="govuk-table__cell">
								Contact tracing
							</td>
							<td className="govuk-table__cell">Call rescheduled</td>
							<td className="govuk-table__cell govuk-table__cell--numeric">
								<a href="/helpcase-profile/1/call-starter">View</a> {/* Will filter case notes accordingly  */}
							</td>
						</tr>
						<tr className="govuk-table__row">
							<td scope="row" className="govuk-table__cell">
								Shielding
							</td>
							<td className="govuk-table__cell">Follow-up</td>
							<td className="govuk-table__cell govuk-table__cell--numeric">
								<a href="/helpcase-profile/1/call-starter">View</a> {/* Will filter case notes accordingly  */}
							</td>
						</tr>
						<tr className="govuk-table__row">
							<td scope="row" className="govuk-table__cell">
								Help Requested
							</td>
							<td className="govuk-table__cell">Call</td>
							<td className="govuk-table__cell govuk-table__cell--numeric">
								<a href="/helpcase-profile/1/call-starter">View</a> {/* Will filter case notes accordingly  */}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}
