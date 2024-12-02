import { count } from "./count.ts";
import { zip } from "./zip.ts";

/**
 * Return an enumerate object.
 */
export const enumerate = function* <T>(
  iterable: Iterable<T>,
): Generator<[number, T]> {
  yield* zip(count(), iterable);
};
