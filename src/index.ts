import * as npmFunctions from './lib/npm';
import { NpmException } from './lib/npmException';

// Export functions
export const stat = npmFunctions.stat;
export const details = npmFunctions.details;

// Export types and exception
export { NpmException };
export * from '../index.d';
