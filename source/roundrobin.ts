/**
 * Round-robin between multiple iterables
 */
export const roundrobin = function* <T>(
  ...iterables: Iterable<T>[]
): Generator<T> {
  const iterators = iterables.map((i) => Iterator.from(i));
  while (iterators.length > 0) {
    const next = iterators[0]?.next();
    if (next?.done) {
      iterators.shift();
    } else {
      if (next) {
        yield next.value;
      }
      const n = iterators.shift();
      if (n) {
        iterators.push(n);
      }
    }
  }
};
