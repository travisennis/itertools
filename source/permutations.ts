import { range } from "./range.ts";

/**
 *
 * @see https://stackoverflow.com/questions/9960908/permutations-in-javascript
 *
 * @param {*} iterable
 */
export const permutations = function* <T>(iterable: Iterable<T>, r?: number) {
  const pool = Array.from(iterable);
  const n = pool.length;
  const x = r === undefined ? n : r;

  if (x > n) {
    throw new Error("r exceeds pool length");
  }

  let indices = Array.from(range(0, n));
  const cycles = Array.from(range(n, n - x, -1));
  const poolgetter = (i: number) => pool[i];

  yield indices.slice(0, x).map(poolgetter);

  while (true) {
    let cleanExit = true;
    for (const i of range(x - 1, -1, -1)) {
      cycles[i] -= 1;
      if (cycles[i] === 0) {
        indices = indices
          .slice(0, i)
          .concat(indices.slice(i + 1))
          .concat(indices.slice(i, i + 1));
        cycles[i] = n - i;
      } else {
        const j = cycles[i];

        const [p, q] = [indices[indices.length - j], indices[i]];
        indices[i] = p;
        indices[indices.length - j] = q;
        yield indices.slice(0, x).map(poolgetter);
        cleanExit = false;
        break;
      }
    }

    if (cleanExit) {
      return;
    }
  }
};
