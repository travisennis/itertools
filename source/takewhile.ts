/**
 * Make an iterator that returns elements from the iterable as long as the
 * predicate is true.
 */

export const takewhile = function* <T>(
  iterable: Iterable<T>,
  func: (x: T) => boolean,
): Generator<T, void> {
  for (const x of iterable) {
    if (func(x)) {
      yield x;
    } else {
      return;
    }
  }
};
