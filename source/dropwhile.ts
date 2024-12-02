/**
 * Make an iterator that drops elements from the iterable as long as the
 * predicate is true; afterwards, returns every element.
 */

export const dropwhile = function* <T>(
  iterable: Iterable<T>,
  func: (item: T) => boolean,
): Generator<T, void, unknown> {
  let found = false;
  for (const x of iterable) {
    if (func(x) && !found) {
      found = true;
      continue;
    }
    yield x;
  }
};
