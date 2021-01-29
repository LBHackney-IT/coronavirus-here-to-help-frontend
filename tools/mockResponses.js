const { randomInt, randomNullableBool, nullOrValue, nItems } = require('./testUtility');
const {
    ResidentV4APIEntity,
    HelpRequestV4APIEntity,
    HelpRequestCallV4APIEntity
} = require('./factories');

const getSingleResidentV4 = (overrideRandomFields = {}) => {
    return new ResidentV4APIEntity().sample(overrideRandomFields);
};

const getMultipleResidentsV4 = (quantity = 3, overrideRandomFields = {}) => {
    return nItems(quantity, getSingleResidentV4, overrideRandomFields);
};

module.exports = {
    getSingleResidentV4,
    getMultipleResidentsV4
};
