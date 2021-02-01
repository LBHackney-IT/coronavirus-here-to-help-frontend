import Layout from '../components/layout';
import styles from '../styles/Home.module.css';

export default function HomePage() {
    return (
        <Layout>
            <h1 className="govuk-heading-xl">Here to help</h1>

            <table className="govuk-table lbh-table">
                <tbody className="govuk-table__body">
                    <tr className="govuk-table__row">
                        <th scope="row" className="govuk-table__header">
                            Search for residents
                        </th>
                        <td className="govuk-table__cell govuk-table__cell--numeric">
                            <a
                                href="/resident-search"
                                className="govuk-button lbh-button"
                                data-module="govuk-button"
                                data-testid="search-for-residents_button">
                                Go
                            </a>
                        </td>
                    </tr>

                    <tr className="govuk-table__row">
                        <th scope="row" className="govuk-table__header">
                            View callback list
                        </th>
                        <td className="govuk-table__cell govuk-table__cell--numeric">
                            <a
                                href="/callback-list"
                                className="govuk-button lbh-button js-cta-btn"
                                data-module="govuk-button"
                                data-testid="view-callback-list_button">
                                Go
                            </a>
                        </td>
                    </tr>

                    <tr className="govuk-table__row">
                        <th scope="row" className="govuk-table__header">
                            Assign calls
                        </th>
                        <td className="govuk-table__cell govuk-table__cell--numeric">
                            <a
                                href="/assign-calls"
                                className="govuk-button lbh-button js-cta-btn"
                                data-module="govuk-button">
                                Go
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>

            <footer className={styles.footer} />
        </Layout>
    );
}
