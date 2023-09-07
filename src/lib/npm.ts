import load from "./request";
import { StatType, DetailType } from "../types";

/**
 * Get module stats
 *
 * @param {String} pkg: module name
 * @param {String} start: Start date of search period
 * @param {String} end: End date of search period
 * @returns Promise object
 */
const stat = (pkg: string, start: Date, end: Date): StatType => {
  const url = `https://api.npmjs.org/downloads/point/${start}:${end}/${pkg ? pkg : ""}`;
  return load(url)
};


/**
 * Get module detail info
 *
 * @param {String} pkg: module name
 * @returns Promise object
 */
const details =  (pkg: string): DetailType => {
  const url = `https://registry.npmjs.org/${pkg ? pkg : ""}`;
  return load(url)
};

module.exports = { stat, details }