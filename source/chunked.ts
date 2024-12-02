/**
 * Break iterable into chunks of size n
 */
export const chunked = function* <T>(
  iterable: Iterable<T>,
  n: number,
): Generator<T[]> {
  let chunk: T[] = [];
  for (const item of iterable) {
    chunk.push(item);
    if (chunk.length === n) {
      yield chunk;
      chunk = [];
    }
  }
  if (chunk.length > 0) {
    yield chunk;
  }
};
