import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../components/Form';
import Layout from '../components/layout';

export default function ResidentSearchPage() {
    const [postcode, setPostcode] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    return (
        <Layout>
            <div>
                <Link href="/dashboard">
                    <a className="govuk-back-link  lbh-back-link">
                        Back
                    </a>
                </Link>
                <hr className="govuk-section-break govuk-section-break--s govuk-section-break" />
                <h1 className="govuk-heading-xl" style={{ marginBottom: '0.1em' }}>
                    Resident lookup
                </h1>
                <p className="govuk-body">
                    Search for resident by postcode <strong>or</strong> name to see if weve helped
                    them before.
                </p>
                <hr className="govuk-section-break govuk-section-break--m govuk-section-break" />
                <form action="/listresident">
                    <div className="govuk-!-margin-bottom-5">
                        <div className="govuk-grid-row row-margin-top-m">
                            <div className="govuk-grid-column-one-third">
                                <label className="govuk-label" htmlFor="postcode">
                                    Postcode
                                </label>
                                <div>
                                    <input
                                        className="govuk-input govuk-input--width-10"
                                        id="postcode"
                                        name="postcode"
                                        type="text"
                                        value={postcode}
                                        onInput={(e) => setPostcode(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="govuk-grid-column-one-third">
                                <label className="govuk-label" htmlFor="firstName">
                                    First name
                                </label>
                                <div className="govuk-form-group">
                                    <input
                                        className="govuk-input govuk-input--width-12"
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={firstName}
                                        onInput={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="govuk-grid-column-one-third">
                                <label className="govuk-label" htmlFor="lastName">
                                    Last name
                                </label>
                                <div className="govuk-form-group">
                                    <input
                                        className="govuk-input govuk-input--width-12"
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={lastName}
                                        onInput={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link
                        href={{
                            pathname: '/residents-list',
                            query: { postcode: postcode, firstName: firstName, lastName: lastName }
                        }}>
                        <Button text="Search" />
                    </Link>
                </form>
            </div>
        </Layout>
    );
}

export async function getServerSideProps() {
    return {
      props: {},
    }
}
