/**
 * generateRandomId
 * generates a random id
 *
 * @returns {string} - a random string containing combination
 * of capital and small letters and numbers
 */
export const generateRandomId = () => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  [...new Array(8)].forEach(() => {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  });
  return text;
};