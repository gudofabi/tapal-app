/** Format Date
 *
 * Output: YYYY-MM-DD
 */
export const formatDate = (date: Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/** Format Money
 *
 * @param number
 *
 * @returns  "99,000.00"
 */
export const formatMoney = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};
