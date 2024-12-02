/**
 * Returns only elements that appear exactly n times
 */
export const exactlyN = function* <T>(
  iterable: Iterable<T>,
  n: number,
): Generator<T> {
  const counts = new Map<T, number>();
  const buffer: T[] = [];

  for (const item of iterable) {
    buffer.push(item);
    counts.set(item, (counts.get(item) ?? 0) + 1);
  }

  for (const item of buffer) {
    if (counts.get(item) === n) {
      yield item;
    }
  }
};
