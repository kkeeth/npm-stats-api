import load from "./request";
import type { StatType, DetailType } from "../../index.d";

/**
 * Get module stats
 *
 * @param {String} pkg: module name
 * @param {String} start: Start date of search period
 * @param {String} end: End date of search period
 * @returns Promise object
 */
export const stat = (pkg: string, start: string, end: string): StatType => {
  const url = `https://api.npmjs.org/downloads/point/${start}:${end}/${pkg ? pkg : ""}`;
  return load(url)
};


/**
 * Get module detail info
 *
 * @param {String} pkg: module name
 * @returns Promise object
 */
export const details =  (pkg: string): DetailType => {
  const url = `https://registry.npmjs.org/${pkg ? pkg : ""}`;
  return load(url)
};
