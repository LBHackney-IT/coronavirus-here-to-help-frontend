import React from "react";
import Layout from "../../../components/layout";
import SupportTable from "../../../components/SupportTable/SupportTable";
import KeyInformation from "../../../components/KeyInformation/KeyInformation";
import CaseNotes from "../../../components/CaseNotes/CaseNotes";
import Link from "next/link";
import { Button } from "../../../components/Form";
import { useRouter } from "next/router";
import axios from "axios";

export default function HelpcaseProfile({ helpr_id, resident }) {
  const router = useRouter();

  console.log(router.query);
  //useEffect();
  return (
    <Layout>
      <div>
        <a
          href="#"
          class="govuk-back-link"
          style={{
            marginTop: "-40px",
            display: "block",
            borderBottom: "none"
          }}
        >
          Back {helpr_id}
        </a>
        <div class="govuk-grid-row">
          <div class="govuk-grid-column-one-quarter-from-desktop sticky-magic">
            <KeyInformation />
          </div>

          <div class="govuk-grid-column-three-quarters-from-desktop">
            <h1
              class="govuk-heading-xl"
              style={{ marginTop: "0px", marginBottom: "40px" }}
              data-testid="resident-name_header"
            >
              {resident.FirstName} {resident.LastName}
            </h1>

            <SupportTable />

            <Link href="/add-support">
              <Button text="+ Add new support" />
            </Link>

            <hr />

            <br />
            <CaseNotes />
          </div>
        </div>
      </div>
    </Layout>
  );
}

HelpcaseProfile.getInitialProps = async ({ query: { helpr_id }, req, res }) => {
  try {
    const host = "http://localhost:3001"; //hardcode for now
    const url = `${host}/residents/${helpr_id}`;
    const resident = await axios.get(url, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return {
      helpr_id: helpr_id,
      resident: resident.data
    };
  } catch (err) {
    console.Console(
      `Error getting resident props with help request ID ${helpr_id}: ${err}`
    );
  }
};
