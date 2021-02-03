const { CaseNote_FrontEnd_RequestBody } = require('./factories');

const postSingleCaseNoteV4Body_Speculative = (overrideRandomFields = {}) => {
    return new CaseNote_FrontEnd_RequestBody().sample(overrideRandomFields);
};

module.exports = {
    postSingleCaseNoteV4Body_Speculative
};
