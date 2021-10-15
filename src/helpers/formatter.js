export const formatSubText = (text, subtext = '') => {
    return subtext ? text.concat(' (', subtext, ')') : text;
};

export const formatSubTextMenu = (subtext = '') => {
    return subtext ? '--'.concat(subtext) : subtext;
};

export const splitName = (name) => {
    if (!name) {
        return { firstName: '', lastName: '' };
    } else {
        const splitName = name.split(' ');
        const lastName = splitName.pop();
        const firstName = splitName.join(' ');
        return { firstName: firstName, lastName: lastName };
    }
};
