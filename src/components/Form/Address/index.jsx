import React, {useEffect} from 'react';
import { useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import { AddressesGateway } from '../../../gateways/addresses';


export default function Address({ initialResident, onChange }) {
    let [lookupPostcode, setLookupPostcode] = useState('');
    let [addresses, setAddresses] = useState({"address": []});
    let [resident, setResident] = useState(initialResident);

    const gateway = new AddressesGateway();

    const FindAddresses = async () => {
        setAddresses(await gateway.getAddresses(lookupPostcode));
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

    console.log("Resident",resident);

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
                        onClick={() => FindAddresses()}>
                        Search
                    </button>
                    {addresses && (
                        <Dropdown
                            dropdownItems={dropdownItems}
                            onChange={(value) => setResident(value)}
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
                            defaultValue={resident?.addressFirstLine}
                            onChange={(e) => onChange(e.target.id, e.target.value)}
                        />
                    </div>

                    <div className="govuk-form-group lbh-form-group">
                        <input
                            className="govuk-input  lbh-input"
                            id="AddressSecondLine"
                            name="AddressSecondLine"
                            type="text"
                            defaultValue={resident?.addressSecondLine}
                            onChange={(e) => onChange(e.target.id, e.target.value)}
                        />
                    </div>
                    <div className="govuk-form-group lbh-form-group">
                        <input
                            className="govuk-input  lbh-input"
                            id="AddressThirdLine"
                            name="AddressThirdLine"
                            type="text"
                            value={resident?.addressThirdLine}
                            onChange={(e) => onChange(e.target.id, e.target.value)}
                        />
                    </div>
                    <div className="govuk-form-group lbh-form-group">
                        <input
                            className="govuk-input  lbh-input"
                            id="postcode"
                            name="postcode"
                            type="text"
                            defaultValue={resident?.postCode}
                            onChange={(e) => onChange(e.target.id, e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
