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

function parseObjectTreeCase(item, convertCase) {
    if (item === null || item === undefined) return;

    let prototype = Object.getPrototypeOf(item);
    let isObject = prototype === Object.prototype;
    let isArray = prototype === Array.prototype;

    if (!isObject && !isArray) return;

    if (isObject) {
        for (key in item) {
            replaceObjectKey(item, key, convertCase(key));
            parseObjectTreeCase(item[convertCase(key)], convertCase);
        }
    }

    if (isArray) item.forEach((element) => parseObjectTreeCase(element, convertCase));
}

const parsePascalToCamelCase = (item) => parseObjectTreeCase(item, pascalToCamel);
const parseCamelToPascalCase = (item) => parseObjectTreeCase(item, camelToPascal);

const objectToQueryAndParseToPascal = (obj) => {
    parseCamelToPascalCase(item);
    return objectToQuery(obj);
}

module.exports = {
    objectToQuery,
    objectToQueryAndParseToPascal,
    parsePascalToCamelCase,
    parseCamelToPascalCase
};
