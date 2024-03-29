import React from 'react';
import PropTypes from 'prop-types';

const Banner = ({ text }) => (
    <div className="govuk-notification-banner" role="region" aria-labelledby="govuk-notification-banner-title" data-module="govuk-notification-banner">
        <div className="govuk-notification-banner__header">
            <h2 className="govuk-notification-banner__title" id="govuk-notification-banner-title">
                Important
            </h2>
        </div>
        <div className="govuk-notification-banner__content">
            <p className="govuk-notification-banner__heading">{text}</p>
        </div>
    </div>
);

Banner.propTypes = {
    text: PropTypes.string.isRequired
};

export default Banner;
