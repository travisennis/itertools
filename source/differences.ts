/**
 * Calculate differences between successive elements
 */
export const differences = function* <T>(
  iterable: Iterable<T>,
  key: (x: T) => number = (x) => Number(x),
): Generator<number> {
  const iterator = Iterator.from(iterable);
  const first = iterator.next();
  if (first.done) return;

  let prev = key(first.value);
  for (const item of iterator) {
    const curr = key(item);
    yield curr - prev;
    prev = curr;
  }
};
