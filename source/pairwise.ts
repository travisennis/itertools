import { isIterable } from "./isIterable.ts";

/**
 * Make an iterator of overlapping pairs from an iterable.
 * Returns an iterator of tuples where each tuple contains two adjacent elements from the iterable.
 * The iterator stops when no more pairs can be formed.
 */
export const pairwise = function* <T>(
  iterable: Iterable<T> | Iterator<T>,
): Generator<[T, T]> {
  const iterator = isIterable(iterable) ? Iterator.from(iterable) : iterable;
  let prev = iterator.next();

  if (prev.done) {
    return; // Empty iterable, no pairs to yield
  }

  while (true) {
    const next = iterator.next();
    if (next.done) {
      return;
    }
    yield [prev.value, next.value];
    prev = { value: next.value, done: false };
  }
};
