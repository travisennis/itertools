/**
 * Make an iterator that filters elements from iterable returning only those
 * for which the predicate is True.
 */

export const filter = function* <T>(
  iterable: Iterable<T>,
  func: (x: T) => boolean,
): Generator<T> {
  for (const x of iterable) {
    if (func(x)) {
      yield x;
    }
  }
};
