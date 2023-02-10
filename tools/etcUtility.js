// Returns British Summer Time (if in effect) corrected date.
// This function is used for date fields that are about to be
// implicitly converted to ISO date.
const getTimeZoneCorrectedLocalDate = () => {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    const localTimeTZCorrectedBase = new Date(Date.now() - tzoffset);
    return localTimeTZCorrectedBase;
}

// Constructs a full query string from a provided object containing (key-val) query parameters.
const objToQueryStr = (queryParams) => (Object.keys(queryParams) > 0 ? `?${new URLSearchParams(queryParams)}` : '');

const removeBlanksFromQueryObj = (queryObj) => Object.fromEntries(Object.entries(queryObj).filter(([_, v]) => v));

// When deployed, for some reason, the next proxy, or the step prior
// sets an empty body to an empty buffer, which causes some issues when forwarding requests.
const isBodyEmptyBuffer = (body) => Buffer.isBuffer(body) && body.length === 0; 

module.exports = {
    getTimeZoneCorrectedLocalDate,
    objToQueryStr,
    removeBlanksFromQueryObj,
    isBodyEmptyBuffer
};
