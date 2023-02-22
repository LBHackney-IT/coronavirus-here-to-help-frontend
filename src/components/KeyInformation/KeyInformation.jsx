import React from 'react';
import styles from './KeyInformation.module.scss';
import Link from 'next/link';
import { useState } from 'react';

export default function KeyInformation({ resident }) {
    const [hidden, setHidden] = useState(false);
    const setHiddenValue = () => {
        setHidden(!hidden);
    };

    const getAge = (birthday) => {
        const ageDiff = Date.now() - birthday.getTime();
        const ageDate = new Date(ageDiff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    return (
        <div>
            <div className={styles['key-information-box']}>
                <div>
                    <a href="#" onClick={() => setHiddenValue()}>
                        {hidden && <p>Show</p>}
                        {!hidden && <p>Hide</p>}
                    </a>
                    <h3 className="govuk-heading-s">
                        Contact details
                        <Link
                            href="/helpcase-profile/[residentId]/editresident"
                            as={`/helpcase-profile/${resident.id}/editresident`}>
                            <a
                                data-testid="edit-resident-bio-button"
                                className={styles['edit-link-icon']}
                            >
                            ✎
                            </a>
                        </Link>
                    </h3>
                </div>
                <div hidden={hidden}>
                    <p
                        data-testid={`key-information_phone-number`}
                        key={`key-information_phone-number`}>
                        Phone 1: {resident.contactTelephoneNumber}
                    </p>
                    <p
                        data-testid={`key-information_mobile-phone-number`}
                        key={`key-information_mobile-phone-number`}>
                        Phone 2: {resident.contactMobileNumber}
                    </p>
                    <br />
                    <h3 className="govuk-heading-s">Address</h3>
                    <p data-testid="key-information_resident-address">
                        {resident.addressFirstLine}
                        <br />
                        {resident.addressSecondLine}
                        <br />
                        {resident.addressThirdLine}
                        <br />
                        {resident.postCode}
                    </p>
                    <br />
                </div>
            </div>

            <div className={styles['key-information-box']}>
                <h3 className="govuk-heading-s">Key information</h3>
                <div hidden={hidden}>
                    {resident.dobYear && resident.dobMonth && resident.dobDay && (
                        <>
                            <p>
                                Date of birth: {resident.dobDay}/{resident.dobMonth}/
                                {resident.dobYear}
                            </p>
                            <p>
                                Age:{' '}
                                {getAge(
                                    new Date(resident.dobYear, resident.dobMonth, resident.dobDay)
                                )}
                            </p>
                        </>
                    )}
                    {resident.nhsNumber && <p>NHS Number: {resident.nhsNumber}</p>}
                    <br />
                    <div>
                        <h3 className="govuk-heading-s">
                            Key notes:
                            <a
                                href={`/helpcase-profile/${resident.id}/editresident`}
                                className={styles['edit-link-icon']}>
                                ✎
                            </a>
                        </h3>
                        {resident.keyNotes || 'None'}
                    </div>
                    <br />
                </div>
            </div>
        </div>
    );
}
