/**
 * Make an iterator that filters elements from iterable return only those
 * for which the predicate is False.
 */

export const filterfalse = function* <T>(
  iterable: Iterable<T>,
  func: (x: T) => boolean,
): Generator<T> {
  for (const x of iterable) {
    if (!func(x)) {
      yield x;
    }
  }
};
