import load from "./request";
import type { Response } from "./formatResponse";

/**
 * Get module stats
 *
 * @param {String} pkg: module name
 * @param {String} start: Start date of search period
 * @param {String} end: End date of search period
 * @returns Promise object
 */
export const stat = (pkg: string, start: string, end: string): Promise<Response> => {
  const url = `https://api.npmjs.org/downloads/point/${start}:${end}/${pkg ? pkg : ""}`;
  return load(url);
};

/**
 * Get module detail info
 *
 * @param {String} pkg: module name
 * @returns Promise object
 */
export const details = (pkg: string): Promise<Response> => {
  const url = `https://registry.npmjs.org/${pkg ? pkg : ""}`;
  return load(url);
};
