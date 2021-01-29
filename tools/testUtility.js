const randomInt = (maxN = 10) => Math.floor(Math.random() * maxN + 1);
const randomNullableBool = () => (Math.random() > 0.5 ? true : false);
const nullOrValue = (val) => (Math.random() > 0.5 ? null : val);
function nItems(quantity, f, ...args) {
    const collection = [];
    for (let q = quantity; q > 0; q--) collection.push(f(...args));
    return collection;
}

module.exports = {
    randomInt,
    randomNullableBool,
    nullOrValue,
    nItems
};
