import { range } from "./range.ts";

/**
 * Make an iterator that returns selected elements from the iterable.
 */
export const slice = function* <T>(
  iterable: Iterable<T>,
  start?: number,
  stop?: number,
  step = 1,
): Generator<T> {
  const it = range(start ?? 0, stop ?? Number.POSITIVE_INFINITY, step);
  let nexti = it.next();
  let count = -1;
  for (const x of iterable) {
    count++;
    if (count === nexti.value) {
      yield x;
      nexti = it.next();
      if (nexti.done) {
        break;
      }
    }
  }
};
