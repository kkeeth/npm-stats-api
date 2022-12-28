const load = require("./request");

module.exports = {
  /**
   * Get module stats
   *
   * @param {String} pkg: module name
   * @param {String} start: Start date of search period
   * @param {String} end: End date of search period
   * @returns Promise object
   */
  stat: (pkg, start, end) => {
    const url = `https://api.npmjs.org/downloads/point/${start}:${end}/${pkg ? pkg : ""}`;
    return load(url)
  },
  /**
   * Get module detail info
   *
   * @param {String} pkg: module name
   * @returns Promise object
   */
  details: (pkg) => {
    const url = `https://registry.npmjs.org/${pkg ? pkg : ""}`;
    return load(url)
  },
};
