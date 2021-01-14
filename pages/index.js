import Head from "next/head";
import Layout from "../components/layout";
import styles from "../styles/Home.module.css";

export default function HomePage() {
  return (
    <Layout>
      <h1 class="govuk-heading-xl">Here to help</h1>

      <table class="govuk-table lbh-table">
        <tbody class="govuk-table__body">
          <tr class="govuk-table__row">
            <th scope="row" class="govuk-table__header">
              Search for residents
            </th>
            <td class="govuk-table__cell govuk-table__cell--numeric">
              <a
                href="/resident-search"
                class="govuk-button lbh-button"
                data-module="govuk-button"
              >
                Go
              </a>
            </td>
          </tr>

          <tr class="govuk-table__row">
            <th scope="row" class="govuk-table__header">
              View callback list
            </th>
            <td class="govuk-table__cell govuk-table__cell--numeric">
              <a
                href="/callback-list"
                class="govuk-button lbh-button js-cta-btn"
                data-module="govuk-button"
              >
                Go
              </a>
            </td>
          </tr>

          <tr class="govuk-table__row">
            <th scope="row" class="govuk-table__header">
              Assign calls
            </th>
            <td class="govuk-table__cell govuk-table__cell--numeric">
              <a
                href="/assign-calls"
                class="govuk-button lbh-button js-cta-btn"
                data-module="govuk-button"
              >
                Go
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <footer className={styles.footer}></footer>
    </Layout>
  );
}
