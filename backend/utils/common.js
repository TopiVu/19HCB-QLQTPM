module.exports = {
    parse2PlainObject: (object) => {
        return JSON.parse(JSON.stringify(object));
    }
}