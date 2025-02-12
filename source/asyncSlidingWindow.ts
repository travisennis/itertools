/**
 * Returns an async iterator of overlapping windows of size n
 */
export const asyncSlidingWindow = async function* <T>(
  iterable: AsyncIterable<T> | Iterable<T>,
  n: number,
): AsyncGenerator<T[]> {
  if (n <= 0) throw new Error("Window size must be positive");

  const asyncIterable =
    Symbol.asyncIterator in iterable
      ? iterable
      : (async function* () {
          yield* iterable as Iterable<T>;
        })();

  const window: T[] = [];

  // Fill initial window
  for await (const item of asyncIterable) {
    window.push(item);
    if (window.length === n) {
      yield [...window];
      break;
    }
  }

  // Slide window
  for await (const item of asyncIterable) {
    window.shift();
    window.push(item);
    yield [...window];
  }
};
