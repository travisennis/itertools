/**
 *
 */

export const flatten = function* <T>(iterables: Iterable<T>[]) {
  for (const iterable of iterables) {
    for (const item of iterable) {
      yield item;
    }
  }
};
