import React, { useEffect } from 'react';
import { useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import { AddressesGateway } from '../../../gateways/addresses';

export default function Address({ initialResident, onChange }) {
    let [lookupPostcode, setLookupPostcode] = useState('');
    let [addresses, setAddresses] = useState({ address: [] });
    let [resident, setResident] = useState(initialResident);

    const gateway = new AddressesGateway();

    const FindAddresses = async () => {
        setAddresses(await gateway.getAddresses(lookupPostcode));
    };
    const setSelectedAddress = (value) => {
        const [addressFirstLine, addressSecondLine, addressThirdLine, postCode] = value.split(', ');

        const newResident = {
            ...resident,
            addressFirstLine,
            addressSecondLine,
            addressThirdLine,
            postCode
        };

        const uprn = addresses.address.filter(
            (address) =>
                address.line1 == addressFirstLine &&
                address.line2 == addressSecondLine &&
                `${address.line3} ${address.line4}` == addressThirdLine &&
                address.postcode == postCode
        )[0].UPRN;
        onChange({ addressFirstLine, addressSecondLine, addressThirdLine, postCode, uprn });

        resident = newResident;
        setResident(newResident);
    };
    useEffect(() => {}, [resident]);

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
                            id="addressFirstLine"
                            name="addressFirstLine"
                            type="text"
                            value={
                                resident.addressFirstLine
                                    ? resident.addressFirstLine
                                    : initialResident?.addressFirstLine
                            }
                            // onChange={(e) => {onChange(e.target.id, e.target.value); resident.addressFirstLine = e.target.value; }}
                        />
                    </div>

                    <div className="govuk-form-group lbh-form-group">
                        <input
                            className="govuk-input  lbh-input"
                            id="addressSecondLine"
                            name="addressSecondLine"
                            type="text"
                            value={
                                resident.addressSecondLine
                                    ? resident.addressSecondLine
                                    : initialResident?.addressSecondLine
                            }
                            // onChange={(e) => {onChange(e.target.id, e.target.value); resident.addressSecondLine = e.target.value; }}
                        />
                    </div>
                    <div className="govuk-form-group lbh-form-group">
                        <input
                            className="govuk-input  lbh-input"
                            id="addressThirdLine"
                            name="addressThirdLine"
                            type="text"
                            value={
                                resident.addressThirdLine
                                    ? resident.addressThirdLine
                                    : initialResident?.addressThirdLine
                            }
                            // onChange={(e) => {onChange(e.target.id, e.target.value); resident.addressThirdLine = e.target.value; }}
                        />
                    </div>
                    <div className="govuk-form-group lbh-form-group">
                        <input
                            className="govuk-input  lbh-input"
                            id="postcode"
                            name="postcode"
                            type="text"
                            value={
                                resident.postCode ? resident.postCode : initialResident?.postCode
                            }
                            // onChange={(e) => {onChange(e.target.id, e.target.value); resident.postCode = e.target.value; }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
