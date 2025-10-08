/**
 * Validation utilities
 */

/**
 * Check if a string is empty or null
 */
export const isEmpty = (value) => {
  return !value || value.trim().length === 0;
};

/**
 * Validate GitHub token format
 */
export const isValidToken = (token) => {
  if (!token) return false;
  // Token should start with 'Bearer ' or be a valid GitHub token
  return token.startsWith('Bearer ') || token.startsWith('ghp_') || token.startsWith('gho_');
};

/**
 * Validate branch name
 */
export const isValidBranchName = (branchName) => {
  if (isEmpty(branchName)) return false;
  // Branch name should not contain certain special characters
  const invalidChars = /[~^:?*\[\]\\/]/;
  return !invalidChars.test(branchName);
};

/**
 * Validate URL format
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if object is empty
 */
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};
