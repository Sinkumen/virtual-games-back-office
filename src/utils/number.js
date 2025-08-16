/**
 * Formats a number into a string with commas as thousands separators.
 *
 * @param {number} value The number to format.
 * @returns {string} The formatted number string.
 */
export const formatNumberWithCommas = (value = 0) => {
  if (typeof value !== "number" || isNaN(value)) {
    return "";
  }
  return new Intl.NumberFormat("en-US").format(value);
};
