import { isIterable } from "./isIterable.ts";

export const product = <T>(...iterables: Iterable<T>[]) => {
  const arr = [...iterables].map((it) => (isIterable(it) ? [...it] : it));
  const len = arr.length;
  const res: T[] = [];

  function* gen(idx = 0): Generator<T[]> {
    if (idx >= len) {
      yield res.slice();
    } else {
      for (const v of arr[idx]) {
        res[idx] = v;
        yield* gen(idx + 1);
      }
    }
  }

  return gen();
};
