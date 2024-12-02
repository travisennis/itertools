/**
 * Return the nth item or a default value
 */
export const nth = <T>(
  iterable: Iterable<T>,
  n: number,
  defaultValue?: T,
): T | undefined => {
  if (n < 0) throw new Error("Negative index");

  let count = 0;
  for (const item of iterable) {
    if (count === n) return item;
    count++;
  }
  return defaultValue;
};
