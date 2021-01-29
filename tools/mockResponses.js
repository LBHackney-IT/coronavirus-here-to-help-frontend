const { nItems } = require('./testUtility');
const {
    ResidentV4APIEntity,
    HelpRequestV4APIEntity,
    HelpRequestCallV4APIEntity
} = require('./factories');

const getSingleResidentV4 = (overrideRandomFields = {}) => {
    return new ResidentV4APIEntity().sample(overrideRandomFields);
};

const getMultipleResidentsV4 = (overrideRandomFields = {}) => {
    return nItems(3, getSingleResidentV4, overrideRandomFields);
};

const getSingleHelpRequestV4 = (overrideRandomFields = {}) => {
    const helpRequest = new HelpRequestV4APIEntity().sample(overrideRandomFields);
    const helpRequestCalls = nItems(3, new HelpRequestCallV4APIEntity().sample, {
        HelpRequestId: helpRequest.HelpRequestId
    });
    return Object.freeze({ ...helpRequest, HelpRequestCalls: helpRequestCalls });
};

const getMultipleHelpRequestsV4 = (overrideRandomFields = {}) => {
    return nItems(3, getSingleHelpRequestV4, overrideRandomFields);
};

module.exports = {
    getSingleResidentV4,
    getMultipleResidentsV4,
    getSingleHelpRequestV4,
    getMultipleHelpRequestsV4
};
