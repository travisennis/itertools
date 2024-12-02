/**
 * Make an iterator that returns consecutive integers starting with start with optional step.
 */

export const count = function* (start = 0, step = 1): Generator<number> {
  for (let i = start; true; i += step) {
    yield i;
  }
};
