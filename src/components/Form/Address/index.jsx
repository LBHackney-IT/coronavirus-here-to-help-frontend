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
    useEffect(() => {}, [resident]);

    const dropdownItems = addresses?.map(
        (x) => `${x.addressFirstLine}, ${x.addressSecondLine}, ${x.addressThirdLine}, ${x.postCode}`
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
                    {(addresses.length > 0) && (
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
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
