import { isIterable } from "./isIterable.ts";

/**
 *
 */
export const tee = <T>(iterable: Iterable<T> | Iterator<T>, n = 2) => {
  const queues: T[][] = [];
  for (let i = 0; i < n; i++) {
    queues.push([]);
  }

  let iter: Iterator<T>;
  if (isIterable(iterable)) {
    iter = Iterator.from(iterable);
  } else {
    iter = iterable;
  }

  function* gen(q: T[]): Generator<T | undefined> {
    while (true) {
      if (q.length === 0) {
        const next = iter.next();
        if (next.done) {
          break;
        }
        const val = next.value;
        for (const d of queues) {
          d.push(val);
        }
      }
      yield q.shift();
    }
  }

  const result: Generator<T | undefined>[] = [];
  for (const d of queues) {
    result.push(gen(d));
  }
  return result;
};
