export const formatSubTypes = (text, subtext = '') => {
    return subtext ? text.concat(' (', subtext, ')') : text;
};
