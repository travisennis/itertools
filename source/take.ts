import { slice } from "./slice.ts";

/**
 * Take first n elements from iterable.
 */

export const take = function* <T>(
  iterable: Iterable<T>,
  n: number,
): Generator<T> {
  yield* slice(iterable, 0, n);
};

// const take1 = <T>(n: number) =>
//   function* (iterable: Iterable<T>) {
//     let i = 0;
//     for (let x of iterable) {
//       if (i >= n) return;
//       yield x;
//       i++;
//     }
//   };
