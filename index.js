'use strict';

var request = require('superagent');

/**
 * Custom Exception definitions
 *
 * @param {Object} err: object from npm API status code and response body
 * @returns void
 */
class NpmException {
    message;
    name;
    statusCode;
    body;
    constructor(err) {
        this.message = err.message;
        this.name = 'NpmException';
        if (!err.response) {
            this.statusCode = 500;
            this.body = {
                ...err
            };
        }
        else if (Number(err.status) >= 400) {
            const { error } = err.response;
            this.statusCode = err.status;
            this.body = {
                path: error.path,
                ...JSON.parse(error.text),
            };
        }
        else {
            // Fallback for unexpected cases
            this.statusCode = 500;
            this.body = {};
        }
    }
}

/**
 * Body module that calls the API
 *
 * @param {String} url: request URL with params
 * @returns {Object} object from npm API status code and response body
 */
const load = async (url) => {
    try {
        const { statusCode, body } = await request
            .get(url)
            .timeout({
            response: 3 * 1000,
            deadline: 5 * 1000,
        });
        return {
            statusCode,
            body,
        };
    }
    catch (err) {
        const obj = new NpmException(err);
        throw obj;
    }
};

/**
 * Get module stats
 *
 * @param {String} pkg: module name
 * @param {String} start: Start date of search period
 * @param {String} end: End date of search period
 * @returns Promise object
 */
const stat = (pkg, start, end) => {
    const url = `https://api.npmjs.org/downloads/point/${start}:${end}/${pkg}`;
    return load(url);
};
/**
 * Get module detail info
 *
 * @param {String} pkg: module name
 * @returns Promise object
 */
const details = (pkg) => {
    const url = `https://registry.npmjs.org/${pkg}`;
    return load(url);
};

var npm = /*#__PURE__*/Object.freeze({
    __proto__: null,
    details: details,
    stat: stat
});

exports.npm = npm;
//# sourceMappingURL=index.js.map
