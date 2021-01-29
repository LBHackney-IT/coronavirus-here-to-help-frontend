import { randomInt, randomNullableBool, nullOrValue, nItems } from './testUtility';
import {
    ResidentV4APIEntity,
} from './factories';

const getSingleResidentV4 = (overrideRandomFields = {}) => {
    return new ResidentV4APIEntity().sample(overrideRandomFields);
};

const getMultipleResidentsV4 = (quantity = 3, overrideRandomFields = {}) => {
    return nItems(quantity, getSingleResidentV4, overrideRandomFields);
};

