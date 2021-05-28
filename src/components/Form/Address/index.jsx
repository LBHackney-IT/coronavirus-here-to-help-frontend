import React, { useEffect } from 'react';
import { useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import { AddressesGateway } from '../../../gateways/addresses';

export default function Address({ initialResident, onChange }) {
    let [lookupPostcode, setLookupPostcode] = useState('');
    let [addresses, setAddresses] = useState([]);
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

        const uprn = addresses.filter(
            (address) =>
                address.addressFirstLine == addressFirstLine &&
                address.addressSecondLine == addressSecondLine &&
                address.addressThirdLine == addressThirdLine &&
                address.postCode == postCode
        )[0].uprn;
        onChange({ addressFirstLine, addressSecondLine, addressThirdLine, postCode, uprn });

        resident = newResident;
        setResident(newResident);
    };

    const handleManualAddressEntry = (addressInputId, addressInputValue) => {
        // honestly, I don't think this component should be talking in terms of resident
        // but I'll leave a TODO: change res to address.
        const newResident = { ...resident, [addressInputId]: addressInputValue}
        setResident(newResident);
        onChange({ [addressInputId]: addressInputValue });
    };

    useEffect(() => {}, [resident]);

    const dropdownItems =['Select an address'].concat(addresses?.map(
        (x) => `${x.addressFirstLine}, ${x.addressSecondLine}, ${x.addressThirdLine}, ${x.postCode}`
    ));
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
                            data-testid="postcode-input"
                        />
                    </div>
                    <button
                        type="button"
                        className="govuk-button  lbh-button"
                        data-module="govuk-button"
                        id="address-finder"
                        onClick={() => FindAddresses()}
                        data-testid="address-search"
                        >
                        Search
                    </button>
                    {(addresses.length > 0) && (
                        <Dropdown
                            dropdownItems={dropdownItems}
                            onChange={(value) => setSelectedAddress(value)}
                            data-testid="address-dropdown"
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
                            onChange={(e) => handleManualAddressEntry(e.target.id, e.target.value)}
                            placeholder="Address line 1"
                            value={
                                resident.addressFirstLine
                                    ? resident.addressFirstLine
                                    : initialResident?.addressFirstLine
                            }
                            data-testid="first-line-address-value"
                        />
                    </div>

                    <div className="govuk-form-group lbh-form-group">
                        <input
                            className="govuk-input  lbh-input"
                            id="addressSecondLine"
                            name="addressSecondLine"
                            type="text"
                            onChange={(e) => handleManualAddressEntry(e.target.id, e.target.value)}
                            placeholder="Address line 2"
                            value={
                                resident.addressSecondLine
                                    ? resident.addressSecondLine
                                    : initialResident?.addressSecondLine
                            }
                            data-testid="second-line-address-value"
                        />
                    </div>
                    <div className="govuk-form-group lbh-form-group">
                        <input
                            className="govuk-input  lbh-input"
                            id="addressThirdLine"
                            name="addressThirdLine"
                            type="text"
                            onChange={(e) => handleManualAddressEntry(e.target.id, e.target.value)}
                            placeholder="Address line 3"
                            value={
                                resident.addressThirdLine
                                    ? resident.addressThirdLine
                                    : initialResident?.addressThirdLine
                            }
                            data-testid="third-line-address-value"
                        />
                    </div>
                    <div className="govuk-form-group lbh-form-group">
                        <input
                            className="govuk-input  lbh-input"
                            id="postCode"
                            name="postCode"
                            type="text"
                            onChange={(e) => handleManualAddressEntry(e.target.id, e.target.value)}
                            placeholder="Post code"
                            value={
                                resident.postCode ? resident.postCode : initialResident?.postCode
                            }
                            data-testid="postcode-address-value"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
