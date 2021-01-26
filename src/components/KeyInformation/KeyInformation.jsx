import React from "react";
import styles from "./KeyInformation.module.scss";
import { useState } from "react";

export default function KeyInformation({ resident }) {
  const [hidden, setHidden] = useState(false);
  const setHiddenValue = () => {
    setHidden(!hidden);
  };

  return (
    <div>
      <div className={styles["key-information-box"]}>
        <div>
          <a href="#" onClick={() => setHiddenValue()}>
            {hidden && <p>Show</p>}
            {!hidden && <p>Hide</p>}
          </a>
          <h3 className="govuk-heading-s">
            Contact details
            <a
              href={`/helpcase-profile/${resident.id}/editresident`}
              className={styles["edit-link-icon"]}
            >
              ✎
            </a>
          </h3>
        </div>
        <div hidden={hidden}>
              <p data-testid={`key-information_phone-number_1`} key={`key-information_phone-number_1`}>
                Phone 1: {resident.contactTelephoneNumber}
              </p>
              <p data-testid={`key-information_phone-number_2`} key={`key-information_phone-number_2`}>
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
          {/* <h3 className="govuk-heading-s">Alternate contact:</h3>
        <p>
          Test Test
          <br />
          Relationship: Carer
          <br />
          Phone 1: 039384
          <br />
          Phone 2: 071839
        </p> */}
        </div>
      </div>

      <div className={styles["key-information-box"]}>
        <h3 className="govuk-heading-s">Key information</h3>
        <div hidden={hidden}>
          <p>
            CEV
            <br />
            Positive Covid test at 2 Dec 2020
            <br />
            CEV Contact Tracing ID: SL 99 88 12 A
          </p>
          <br />
          <div>
            <h3 className="govuk-heading-s">
              Key notes:
              <a href={`/helpcase-profile/${resident.id}/editresident`} className={styles["edit-link-icon"]}>
                ✎
              </a>
            </h3>
          </div>
          <br />
          <p>{resident.keyNotes}</p>
        </div>
      </div>
    </div>
  );
}
