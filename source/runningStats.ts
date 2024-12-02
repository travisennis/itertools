/**
 * Calculate running statistics (min, max, sum, count)
 */
export const runningStats = function* <T>(
  iterable: Iterable<T>,
  key: (x: T) => number = (x) => Number(x),
) {
  let count = 0;
  let sum = 0;
  let min: number | undefined;
  let max: number | undefined;

  for (const item of iterable) {
    const value = key(item);
    count++;
    sum += value;
    min = min === undefined ? value : Math.min(min, value);
    max = max === undefined ? value : Math.max(max, value);

    yield {
      count,
      sum,
      min,
      max,
      mean: sum / count,
    };
  }
};
