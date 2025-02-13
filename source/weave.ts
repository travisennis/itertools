import { cycle } from "./cycle.ts";
import { range } from "./range.ts";

/**
 * Makes an iterator with each element of every iterable yielded in turn.
 */
export const weave = function* <T>(...iters: Iterable<T>[]) {
  for (const count of cycle(range(0, iters.length))) {
    if (!iters[count]) {
      continue;
    }
    yield Iterator.from(iters[count]).next().value;
  }
};
