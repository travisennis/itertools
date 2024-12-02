/**
 * Make an iterator that returns elements from the first iterable until it is
 * exhausted, then proceeds to the next iterable, until all of the iterables
 * are exhausted. Used for treating consecutive sequences as a single sequence.
 */

export const chain = function* <T>(...iters: Iterable<T>[]): Generator<T> {
  for (let i = 0; i <= iters.length; i++) {
    for (const x of iters[i]) {
      yield x;
    }
  }
};
