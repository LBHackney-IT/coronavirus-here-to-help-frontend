export const formatSubText = (text, subtext = '') => {
    return subtext ? text.concat(' (', subtext, ')') : text;
};

export const formatSubTextMenu = (subtext = '') => {
    return subtext ? '--'.concat(subtext) : subtext;
};
