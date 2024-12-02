import { groupBy } from "./groupBy.ts";

/**
 * Takes a list a removes all consecutive duplicates.
 */

export const compress = function* <T>(iterable: Iterable<T> | Iterator<T>) {
  const grouped = groupBy(iterable);
  for (const group of grouped) {
    yield group[0];
  }
};
