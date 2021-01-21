import React from "react";
import Layout from "../../../components/layout";
import KeyInformation from "../../../components/KeyInformation/KeyInformation";
import { useRouter } from "next/router";
import { ResidentGateway } from "../../../gateways/resident";
import { useState } from "react";
import { Button } from "../../../components/Form";
import EditResidentBioForm from "../../../components/EditResidentBioForm/EditResidentBioForm";

export default function HelpcaseProfile({ resident_id, resident }) {
  const [updatedResident, setUpdatedResident] = useState(resident)

  const handleEditResident = (id, value) => {
    setUpdatedResident({...updatedResident, [id]:value})
    console.log(updatedResident, value)
  }

  const logNewResidentDetails = () => {
    console.log(updatedResident)
  }

  return (
    <Layout>
      <div class="govuk-grid-column-one-quarter-from-desktop">
        <KeyInformation resident={resident} />
      </div>
      <div class="govuk-grid-column-three-quarters-from-desktop">
      <EditResidentBioForm resident={resident} onChange={handleEditResident}/>
        <hr class="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
        <Button 
          text="Next"
          onClick={() => logNewResidentDetails()}
        />
      </div>
    </Layout>
  );
}

HelpcaseProfile.getInitialProps = async ({
  query: { resident_id },
  req,
  res
}) => {
  try {
    const gateway = new ResidentGateway();
    const resident = await gateway.getResident(resident_id);

    return {
      resident_id,
      resident
    };
  } catch (err) {
    console.Console(
      `Error getting resident props with help request ID ${resident_id}: ${err}`
    );
  }
};
