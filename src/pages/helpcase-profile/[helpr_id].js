import React from "react";
import Layout from "../../components/layout";
import SupportTable from "../../components/SupportTable/SupportTable";
import KeyInformation from "../../components/KeyInformation/KeyInformation";
import CaseNotes from "../../components/CaseNotes/CaseNotes";
import Link from "next/link";
import { Button } from "../../components/Form";
import { useRouter } from "next/router";

export default function HelpcaseProfile() {
  const router = useRouter();
  const { helpr_id } = router.query;

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
            borderBottom: "none",
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
            >
              Name Surname
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
