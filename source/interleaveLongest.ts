/**
 * Returns alternating elements from two or more iterables
 */
export const interleaveLongest = function* <T>(
  ...iterables: Iterable<T>[]
): Generator<T> {
  const iterators = iterables.map((i) => Iterator.from(i));
  while (iterators.length > 0) {
    for (let i = 0; i < iterators.length; i++) {
      const next = iterators[i]?.next();
      if (next) {
        if (next.done) {
          iterators.splice(i, 1);
          i--;
        } else {
          yield next.value;
        }
      }
    }
  }
};
