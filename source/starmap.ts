/**
 *
 * @param {*} iterable
 * @param {*} func
 */

export const starmap = function* <T extends unknown[], U>(
  iterable: Iterable<T>,
  func: (...args: T) => U,
): Generator<U> {
  for (const x of iterable) {
    yield func(...x);
  }
};
