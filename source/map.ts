/**
 * Make an iterator that computes the function using elements from the
 * iterable.
 */

export const map = function* <T, U>(
  iterable: Iterable<T>,
  func: (x: T) => U,
): Generator<U> {
  for (const x of iterable) {
    yield func(x);
  }
};
