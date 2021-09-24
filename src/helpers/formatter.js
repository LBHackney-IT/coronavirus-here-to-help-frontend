export const formatSubText = (text, subtext = '') => {
    return subtext ? text.concat(' (', subtext, ')') : text;
};
