export const isEmptyObject = object => {
    if (Object.entries(object).length === 0 && object.constructor === Object) {
        return true;
    } else {
        return false;
    }
};
