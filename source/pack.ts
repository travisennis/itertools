import { groupBy } from "./groupBy.ts";

/**
 * Takes a list and breaks consecutive runs of elements into sub-lists.
 */
export const pack = function* <T>(iterable: Iterable<T> | Iterator<T>) {
  const grouped = groupBy(iterable);
  for (const group of grouped) {
    yield group[1].map((i) => i);
  }
};
