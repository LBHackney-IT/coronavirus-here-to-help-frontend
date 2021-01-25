import React from 'react';
import { useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import { AddressesGateway } from '../../../gateways/addresses';


export default function Address({ initialResident, onChange }) {
    let [lookupPostcode, setLookupPostcode] = useState('');
    let [addresses, setAddresses] = useState();
    let [resident, setResident] = useState(initialResident);

    const gateway = new AddressesGateway();

    const FindAddresses = () => {
       return await gateway.getAddresses(lookupPostcode);
    
    };
    const setSelectedAddress = (value) => {
        const [addressFirstLine, addressSecondLine, addressThirdLine, postCode] = value.split(', ');
        onChange('addressFirstLine', addressFirstLine);
        onChange('addressSecondLine', addressSecondLine);
        onChange('addressThirdLine', addressThirdLine);
        onChange('postCode', postCode);
        setResident({
            ...resident,
            addressFirstLine,
            addressSecondLine,
            addressThirdLine,
            postCode
        });
    };
    const dropdownItems = addresses?.address.map(
        (x) => `${x.line1}, ${x.line2}, ${x.line3} ${x.line4}, ${x.postcode}`
    );
    return (
        <>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-one-half">
                    <h3 className="lbh-heading-h3">Search address by postcode</h3>
                    <br />
                    <div className="govuk-form-group lbh-form-group">
                        <input
                            className="govuk-input govuk-input--width-10 lbh-input"
                            id="lookup_postcode"
                            name="lookup_postcode"
                            type="text"
                            onChange={(e) => setLookupPostcode(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="govuk-button  lbh-button"
                        data-module="govuk-button"
                        id="address-finder"
                        onClick={() => setAddresses(FindAddresses())}>
                        Search
                    </button>
                    {addresses && (
                        <Dropdown
                            dropdownItems={dropdownItems}
                            onChange={(value) => setSelectedAddress(value)}
                        />
                    )}
                </div>
                <div className="govuk-grid-column-one-half">
                    <h3 className="lbh-heading-h3">Selected address</h3>
                    <br />
                    <div className="govuk-form-group lbh-form-group">
                        <input
                            className="govuk-input  lbh-input"
                            id="AddressFirstLine"
                            name="AddressFirstLine"
                            type="text"
                            readOnly={true}
                            value={resident?.addressFirstLine}
                        />
                    </div>

                    <div className="govuk-form-group lbh-form-group">
                        <input
                            className="govuk-input  lbh-input"
                            id="AddressSecondLine"
                            name="AddressSecondLine"
                            type="text"
                            readOnly={true}
                            defaultValue={resident?.addressSecondLine}
                        />
                    </div>
                    <div className="govuk-form-group lbh-form-group">
                        <input
                            className="govuk-input  lbh-input"
                            id="AddressThirdLine"
                            name="AddressThirdLine"
                            type="text"
                            readOnly={true}
                            defaultValue={resident?.addressThirdLine}
                        />
                    </div>
                    <div className="govuk-form-group lbh-form-group">
                        <input
                            className="govuk-input  lbh-input"
                            id="postcode"
                            name="postcode"
                            type="text"
                            readOnly={true}
                            defaultValue={resident?.postCode}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
