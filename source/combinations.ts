export const combinations = <T>(iterable: Iterable<T>, r?: number) => {
  const pool = Array.from(iterable);
  const poolLength = pool.length;
  const n = r === undefined ? poolLength : r;

  if (n > poolLength) {
    throw new Error("r exceeds pool length");
  }

  const result: T[] = [];

  function* gen(idx = 0, start = 0): Generator<T[]> {
    if (idx >= n) {
      yield result.slice();
    } else {
      for (let i = start; i < poolLength; i++) {
        result[idx] = pool[i];
        yield* gen(idx + 1, i + 1);
      }
    }
  }

  return gen();
};
