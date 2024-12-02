import { isIterable } from "./isIterable.ts";

/**
 * Make an iterator that returns accumulated sums, or accumulated results of other binary functions.
 * If func is supplied, it should be a function of two arguments.
 * Elements of the input iterable may be any type that can be accepted as arguments to func.
 */

export const accumulate = function* <T>(
  iterable: Iterable<T> | Iterator<T>,
  func: (acc: T, current: T) => T = (a: T, b: T) => (a as any) + (b as any),
): Generator<T> {
  const iterator = isIterable(iterable) ? Iterator.from(iterable) : iterable;
  const first = iterator.next();

  if (first.done) {
    return;
  }

  let total: T = first.value;
  yield total;

  while (true) {
    const next = iterator.next();
    if (next.done) {
      break;
    }
    total = func(total, next.value);
    yield total;
  }
};
