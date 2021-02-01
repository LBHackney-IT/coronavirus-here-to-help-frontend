import React from "react";
import Layout from "../components/layout";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { Button, Checkbox, Dropdown } from "../components/Form";
import { CallHandlerGateway } from '../gateways/call-handler';
import { CallbackGateway } from "../gateways/callback";
import { HelpRequestGateway } from "../gateways/help-request";
import { useRouter } from 'next/router';

export default function AssignCallsPage() {
    const router = useRouter();
    const [callHandlers, setCallHandlers] = useState([]);
    const [selectedCallHandlers, setSelectedCallHandlers] = useState([]);
    const [selectedCallType, setSelectedCallType] = useState("All");

    const callTypes = ["All", "Help Request", "CEV", "Welfare Call", "Contact Tracing"];

    const getCallHandlers = async () => {
      const gateway = new CallHandlerGateway();
      const callHandlersList = await gateway.getCallHandler();

      setCallHandlers(callHandlersList);
  };

  useEffect(getCallHandlers, []);

  const updateSelectedCallHandlers = (value) => {
    console.log(value)
    if(selectedCallHandlers.includes(value)) {
      let newSelectedCallHandlers = selectedCallHandlers.filter(callHandler => callHandler != value)
      setSelectedCallHandlers(newSelectedCallHandlers)
  }
  else {
      let newSelectedCallHandlers = selectedCallHandlers.concat([value])
      setSelectedCallHandlers(newSelectedCallHandlers)
  }
  console.log(selectedCallHandlers)
  }

  const handleAssign = async (event) => {

    const callbackGateway = new CallbackGateway();
    let callbacks = await callbackGateway.getCallback({});
    const gateway = new HelpRequestGateway();

    if (selectedCallType!="All") {
      callbacks = callbacks.filter(callback => callback.callType == selectedCallType)
    }

    let assignmentCount = {}
    selectedCallHandlers.forEach(handler => assignmentCount = {...assignmentCount, [handler]: 0})

    let unassignedCallbacks = [];
    callbacks.forEach(callback => {
      if(callback.assignedTo!=null){
        if (selectedCallHandlers.includes(callback.assignedTo)){
          console.log("callback.assignedTo")
          console.log(callback.assignedTo)
          console.log("selectedCallHandlers")
          console.log(selectedCallHandlers)
          assignmentCount[callback.assignedTo] += 1;
        }
        else {
          unassignedCallbacks.push(callback)
        }
      }
      else{
        unassignedCallbacks.push(callback)
      }
    });

    unassignedCallbacks.forEach(async callback => {
      const [sortedHandlers] = Object.entries(assignmentCount).sort(([ ,v1], [ ,v2]) => v1 - v2);
      assignmentCount[sortedHandlers[0]] += 1;

      const updateObj = { assignedTo:  sortedHandlers[0] };
      await gateway.patchHelpRequest(callback.helpRequestId, updateObj);
    });

    router.push("/callback-list");
}
  return (
    <Layout>
      <div>
        <Link href="/">
            <a href="#" className="govuk-back-link  lbh-back-link">Back</a>
        </Link>

        <h1 className="govuk-heading-xl" style={{marginBottom: "20px"}}>Assign calls</h1>

          <div className="govuk-!-margin-bottom-5">
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-one-half">
                <label className="govuk-label">Call types</label>
                    <Dropdown dropdownItems={callTypes}    
                              onChange={(type) => {setSelectedCallType(type);}}/>
                <div className="govuk-hint">Select call help type</div>
              </div>
              <br />
              <br />
              <br />
              <br />
              <h3 className="govuk-heading-m" style={{marginRight: '1em', marginLeft: '.2em', marginTop: '2em'}}>Select who is able to make calls today</h3>

              <div className="govuk-checkboxes  lbh-checkboxes">
              
              {callHandlers.map((callHandler) => {
                    return (
                        <Checkbox key={callHandler} label={callHandler} value={callHandler} onCheckboxChange={updateSelectedCallHandlers}/>
                );
              })}
               
                </div>
                </div>
          </div>

          <div className="govuk-grid-row" id="btn-bottom-panel">
            <div className="govuk-grid-column-one-half">
            <Button
                text="Assign"
                addClass="govuk-!-margin-right-1"
                onClick={(event)=> { handleAssign(event)}}
            />             
              <Link href="/">
                    <Button
                        text="Cancel"
                        addClass="govuk-button--secondary"
                    />
                </Link>
            </div>
          </div>
      </div>
    </Layout>
  );
}
