/**
 * Returns an iterator of overlapping windows of size n
 */
export const slidingWindow = function* <T>(
  iterable: Iterable<T>,
  n: number,
): Generator<T[]> {
  const iterator = Iterator.from(iterable);
  const window: T[] = [];

  // Fill initial window
  for (let i = 0; i < n; i++) {
    const next = iterator.next();
    if (next.done) return;
    window.push(next.value);
  }

  yield [...window];

  // Slide window
  for (const item of iterator) {
    window.shift();
    window.push(item);
    yield [...window];
  }
};
