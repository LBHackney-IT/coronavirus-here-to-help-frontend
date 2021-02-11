import Link from "next/link";

export default function SupportTable({helpRequests}) {

	return (
		<>
			<div className="govuk-tabs" data-module="govuk-tabs">
				<ul className="govuk-tabs__list">
					<li className="govuk-tabs__list-item govuk-tabs__list-item--selected">
						<a className="govuk-tabs__tab" data-testid='support-requested-tab' href="#past-day">
							Support Requested
						</a>
					</li>
					<li className="govuk-tabs__list-item">
						<a className="govuk-tabs__tab" data-testid='support-received-tab' href="#past-week">
							Support Received
						</a>
					</li>
				</ul>
				<div className="govuk-tabs__panel" id="past-day">
					<table className="govuk-table" data-testid="support-requested-table">
						<thead className="govuk-table__head">
							<tr className="govuk-table__row">
								<th scope="col" className="govuk-table__header">Type</th>
								<th scope="col" className="govuk-table__header">Action required</th>
								<th scope="col" className="govuk-table__header">Call attempts</th>
								<th scope="col" className="govuk-table__header"></th>
							</tr>
						</thead>
						<tbody className="govuk-table__body">
							{helpRequests.map((hr, index) => {
								if(hr.callbackRequired == true){
									return (	<tr className="govuk-table__row" data-testid="support-requested-table_row">
									<td className="govuk-table__cell" data-testid="support-requested-table-help-needed">{hr.helpNeeded}</td>
									<td className="govuk-table__cell"><Link
										href="/helpcase-profile/[resident_id]/manage-request/[help_request]"
										as={`/helpcase-profile/${hr.residentId}/manage-request/${hr.id}`}>{hr.upcomingCallOutcome}</Link></td>
									<td className="govuk-table__cell" data-testid="support-requested-table-calls-count">{hr.helpRequestCalls?.length}</td>
									<td className="govuk-table__cell" data-testid={`support-requested-table-view_link-${index}`}><Link
												href="/helpcase-profile/[resident_id]/manage-request/[help_request]"
												as={`/helpcase-profile/${hr.residentId}/manage-request/${hr.id}`}>View</Link></td>
								</tr>)
								}
							})} 
						</tbody>
					</table>
				</div>
				<div className="govuk-tabs__panel govuk-tabs__panel--hidden" id="past-week">
					<table className="govuk-table">
						<thead className="govuk-table__head">
							<tr className="govuk-table__row">
								<th scope="col" className="govuk-table__header">Type</th>
								<th scope="col" className="govuk-table__header">Total completed calls</th>
								<th scope="col" className="govuk-table__header"></th>
							</tr>
						</thead>
						<tbody className="govuk-table__body">
							{helpRequests.map((hr) => {
								if(hr.callbackRequired == false){
									return (<tr className="govuk-table__row" data-testid="support-received-table_row">
									<td className="govuk-table__cell" data-testid="support-received-table-help-needed">{hr.helpNeeded}</td>
									<td className="govuk-table__cell" data-testid="support-received-table-calls-count" >{hr.totalCompletedCalls}</td>
									<td className="govuk-table__cell"><Link
												href="/helpcase-profile/[resident_id]/manage-request/[help_request]"
												as={`/helpcase-profile/${hr.residentId}/manage-request/${hr.id}`}>View</Link></td>
								</tr>)
								}
							})} 
						</tbody>
					</table>

				</div>

			</div>
		</>
	
	);
}
