/**
 * Yield elements that are different from their immediate neighbors
 */
export const uniqueJustSeen = function* <T>(
  iterable: Iterable<T>,
): Generator<T> {
  let last: T | undefined;
  for (const item of iterable) {
    if (item !== last) {
      yield item;
      last = item;
    }
  }
};
