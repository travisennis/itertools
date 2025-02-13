export const combinationsWithReplacement = <T>(
  iterable: Iterable<T>,
  r: number,
) => {
  const pool = Array.from(iterable);
  const n = pool.length;
  const result: T[] = [];

  function* gen(pos = 0): Generator<T[]> {
    if (result.length === r) {
      yield result.slice();
    } else {
      for (let i = pos; i < n; i++) {
        const poolValue = pool[i];
        if (poolValue) {
          result.push(poolValue);
          yield* gen(i);
          result.pop();
        }
      }
    }
  }

  return gen();
};
