import { isIterable } from "./isIterable.ts";

/**
 * Make an iterator that returns selected elements from the iterable.
 * If start is non-zero, then elements from the iterable are skipped until start is reached.
 * Then, elements are returned consecutively unless step is set higher than one which results in items being skipped.
 * If stop is None, then iteration continues until the iterator is exhausted, if at all; otherwise, it stops at the specified position.
 */
export const islice = function* <T>(
  iterable: Iterable<T> | Iterator<T>,
  start: number | null = 0,
  stop: number | null = null,
  step = 1,
): Generator<T> {
  const it = isIterable(iterable) ? Iterator.from(iterable) : iterable;
  let nextElement = it.next();
  let index = 0;

  // Adjust parameters if only stop is provided
  if (stop === null && start !== null) {
    [start, stop] = [0, start];
  }

  // Skip elements until start
  while (index < (start ?? 0) && !nextElement.done) {
    nextElement = it.next();
    index++;
  }

  // Yield elements until stop or exhaustion
  while (!nextElement.done && (stop === null || index < stop)) {
    if ((index - (start ?? 0)) % step === 0) {
      yield nextElement.value;
    }
    nextElement = it.next();
    index++;
  }
};
