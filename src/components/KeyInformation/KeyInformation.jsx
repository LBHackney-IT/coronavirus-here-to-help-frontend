import React from "react";
import styles from "./KeyInformation.module.scss";

export default function KeyInformation({ resident }) {
  const numbers = resident.ContactTelephoneNumber?.concat(
    resident.ContactMobileNumber
  );
  return (
    <div>
      <div className={styles["key-information-box"]}>
        <h3 class="govuk-heading-s">Contact details</h3>
        {numbers?.map((number, index) => {
          return (
            <p data-testid={`key-information_phone-number_${index}`}>
              Phone {index + 1}: {number}
            </p>
          );
        })}
        <br />
        <h3 class="govuk-heading-s">Address</h3>
        <p data-testid="key-information_resident-address">
          {resident.AddressFirstLine}
          <br />
          {resident.AddressSecondLine}
          <br />
          {resident.AddressThirdLine}
          <br />
          {resident.PostCode}
        </p>
        <br />
        <h3 class="govuk-heading-s">Alternate contact:</h3>
        <p>
          Test Test
          <br />
          Relationship: Carer
          <br />
          Phone 1: 039384
          <br />
          Phone 2: 071839
        </p>

        <a href="/editresident" className={styles["edit-link-icon"]}>
          ✎
        </a>
      </div>

      <div className={styles["key-information-box"]}>
        <h3 class="govuk-heading-s">Key information</h3>
        <br />
        <p>
          CEV
          <br />
          Positive Covid test at 2 Dec 2020
          <br />
          CEV Contact Tracing ID: SL 99 88 12 A
        </p>
        <br />
        <h3 className="govuk-heading-s">
          Key notes:
          <a href="/editresident#down" className={styles["edit-link-icon"]}>
            ✎
          </a>
        </h3>
        <br />
        <p>Calls Helpline often, highly anxious about Covid</p>
      </div>

      <a
        href="#"
        class="minimize"
        onclick="document.getElementsByClassName('sticky-magic')[0].classList.toggle('hidden')"
      ></a>
    </div>
  );
}
