import React from 'react';

const Address = ({}) => (
    <>
        <div class="govuk-grid-row">
            <div class="govuk-grid-column-one-half">
                <h3 class="lbh-heading-h3">Search address by postcode</h3>
                <br />
                <div class="govuk-form-group lbh-form-group">
                    <input
                        class="govuk-input govuk-input--width-10 lbh-input"
                        id="lookup_postcode"
                        name="lookup_postcode"
                        type="text"
                    />
                </div>
                <button
                    type="button"
                    class="govuk-button  lbh-button"
                    data-module="govuk-button"
                    id="address-finder">
                    Search
                </button>
            </div>
            <div class="govuk-grid-column-one-half">
                <h3 class="lbh-heading-h3">Selected address</h3>
                <br />
                <div class="govuk-form-group lbh-form-group">
                    <input
                        class="govuk-input  lbh-input"
                        id="address_first_line"
                        name="address_first_line"
                        type="text"
                        readonly="readonly"
                    />
                </div>

                <div class="govuk-form-group lbh-form-group">
                    <input
                        class="govuk-input  lbh-input"
                        id="address_second_line"
                        name="address_second_line"
                        type="text"
                        readonly="readonly"
                    />
                </div>
                <div class="govuk-form-group lbh-form-group">
                    <input
                        class="govuk-input  lbh-input"
                        id="address_third_line"
                        name="address_third_line"
                        type="text"
                        readonly="readonly"
                    />
                </div>
                <div class="govuk-form-group lbh-form-group">
                    <input
                        class="govuk-input  lbh-input"
                        id="postcode"
                        name="postcode"
                        type="text"
                        readonly="readonly"
                    />
                </div>
            </div>
        </div>
    </>
);

export default Address;
