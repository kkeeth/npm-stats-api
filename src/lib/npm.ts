import { fetchData } from "./request";
import type { StatResponse, DetailResponse } from "../../index.d";

/**
 * Get module download statistics between two dates
 *
 * @param {string} packageName - NPM package name
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @param {string} endDate - End date in YYYY-MM-DD format
 * @returns {Promise<StatResponse>} - Download statistics response
 */
export const stat = (packageName: string, startDate: string, endDate: string): Promise<StatResponse> => {
  if (!packageName) {
    throw new Error("Package name is required");
  }
  
  if (!startDate || !endDate) {
    throw new Error("Start and end dates are required");
  }
  
  const url = `https://api.npmjs.org/downloads/point/${startDate}:${endDate}/${packageName}`;
  return fetchData<StatResponse>(url);
};

/**
 * Get detailed information about an NPM package
 *
 * @param {string} packageName - NPM package name
 * @returns {Promise<DetailResponse>} - Package details response
 */
export const details = (packageName: string): Promise<DetailResponse> => {
  if (!packageName) {
    throw new Error("Package name is required");
  }
  
  const url = `https://registry.npmjs.org/${packageName}`;
  return fetchData<DetailResponse>(url);
};
