/**
 * Returns true if all elements in the iterable are sorted
 */
export const isSorted = <T>(
  iterable: Iterable<T>,
  key: (x: T) => number = (x) => Number(x),
): boolean => {
  const iterator = Iterator.from(iterable);
  const first = iterator.next();
  if (first.done) return true;

  let prev = key(first.value);
  for (const item of iterator) {
    const curr = key(item);
    if (curr < prev) return false;
    prev = curr;
  }
  return true;
};
