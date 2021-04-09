// Returns British Summer Time (if in effect) corrected date.
// This function is used for date fields that are about to be
// implicitly converted to ISO date.
export default function getTimeZoneCorrectedLocalDate() {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    const localTimeTZCorrectedBase = new Date(Date.now() - tzoffset);
    return localTimeTZCorrectedBase;
}