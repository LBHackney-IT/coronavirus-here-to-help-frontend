import Layout from '../components/layout';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function HomePage() {
    // TODO: Refactor Link into a component - crops up too often
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
                            <Link href="/resident-search">
                                <a
                                    className="govuk-button lbh-button"
                                    data-module="govuk-button"
                                    data-testid="search-for-residents_button">
                                    Go
                                </a>
                            </Link>
                        </td>
                    </tr>

                    <tr className="govuk-table__row">
                        <th scope="row" className="govuk-table__header">
                            View callback list
                        </th>
                        <td className="govuk-table__cell govuk-table__cell--numeric">
                            <Link href="/callback-list">
                                <a
                                    className="govuk-button lbh-button js-cta-btn"
                                    data-module="govuk-button"
                                    data-testid="view-callback-list_button">
                                    Go
                                </a>
                            </Link>
                        </td>
                    </tr>

                    <tr className="govuk-table__row">
                        <th scope="row" className="govuk-table__header">
                            Manager view
                        </th>
                        <td className="govuk-table__cell govuk-table__cell--numeric">
                            <Link href="/admin">
                                <a
                                    className="govuk-button lbh-button js-cta-btn"
                                    data-module="govuk-button"
                                    data-testid="admin_button">
                                    Go
                                </a>
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>

            <footer className={styles.footer} />
        </Layout>
    );
}

export async function getServerSideProps() {
    return {
      props: {},
    }
}
