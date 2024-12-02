/**
 * Split iterable into runs of length n
 */
export const runsOfLength = function* <T>(
  iterable: Iterable<T>,
  n: number,
): Generator<T[]> {
  let run: T[] = [];
  let count = 0;

  for (const item of iterable) {
    if (count === n) {
      yield run;
      run = [];
      count = 0;
    }
    run.push(item);
    count++;
  }
  if (run.length === n) yield run;
};
