/**
 * Make an iterator returning elements from the iterable and saving a copy of
 * each. When the iterable is exhausted, return elements from the saved copy.
 * Repeats indefinitely.
 */

export const cycle = function* <T>(iterable: Iterable<T>): Generator<T> {
  const saved: T[] = [];
  for (const e of iterable) {
    yield e;
    saved.push(e);
  }
  while (true) {
    for (const j of saved) {
      yield j;
    }
  }
};
