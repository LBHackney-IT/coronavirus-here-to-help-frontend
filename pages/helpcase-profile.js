import React from 'react';
import Layout from '../components/layout';


export default function HelpcaseProfile() {
    return (
        <Layout>
        <div>
              <h2 class="govuk-tabs__title">
    Contents
  </h2>
  <ul class="govuk-tabs__list">
    <li class="govuk-tabs__list-item">
      <a class="govuk-tabs__tab" href="#past-day">
        Support Requested
      </a>
    </li>
    <li class="govuk-tabs__list-item">
      <a class="govuk-tabs__tab" href="#past-week">
        Support Received
      </a>
    </li>
  </ul>
  <div class="govuk-tabs__panel" id="past-day">
    <table class="govuk-table lbh-table">
            <thead class="govuk-table_header">
                <tr class="govuk-table__row">
                    <th class="govuk-table__header">Type</th>
                    <th class="govuk-table__header">Action required</th>
                    <th class="govuk-table__header"></th>
                </tr>
            </thead>
            <tbody class="govuk-table__body">
                <tr class="govuk-table__row">
                    <td scope="row" class="govuk-table__cell">Contact tracing</td>
                    <td class="govuk-table__cell">Call rescheduled</td>
                    <td class="govuk-table__cell govuk-table__cell--numeric">
                        <a href="/onecall?filter=ct">View</a>
                    </td>
                </tr>
                <tr class="govuk-table__row">
                    <td scope="row" class="govuk-table__cell">Shielding</td>
                    <td class="govuk-table__cell">Follow-up</td>
                    <td class="govuk-table__cell govuk-table__cell--numeric">
                        <a href="/onecall?filter=shield">View</a>
                    </td>
                </tr>
                <tr class="govuk-table__row">
                    <td scope="row" class="govuk-table__cell">Help Requested</td>
                    <td class="govuk-table__cell">Call</td>
                    <td class="govuk-table__cell govuk-table__cell--numeric">
                        <a href="/onecall?filter=hr">View</a>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
        </div>
        </Layout>
    )
}
