const objectToQuery = (obj) =>
    (Object.keys(obj).length > 0 ? '?' : '') +
    Object.keys(obj)
        .map((key) => key + '=' + obj[key])
        .join('&');

const replaceObjectKey = (obj, currentKey, newKey) => {
    obj[newKey] = obj[currentKey];
    delete obj[currentKey];
};

const camelToPascal = (str) => str[0].toUpperCase() + str.substring(1);
const pascalToCamel = (str) => str[0].toLowerCase() + str.substring(1);


module.exports = {
    objectToQuery,
};
