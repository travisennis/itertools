/**
 * Split an iterable into chunks based on a predicate
 */
export const splitWhen = function* <T>(
  iterable: Iterable<T>,
  predicate: (prev: T, curr: T) => boolean,
): Generator<T[]> {
  const iterator = Iterator.from(iterable);
  const first = iterator.next();
  if (first.done) return;

  let chunk: T[] = [first.value];
  let prev = first.value;

  for (const item of iterator) {
    if (predicate(prev, item)) {
      yield chunk;
      chunk = [];
    }
    chunk.push(item);
    prev = item;
  }
  if (chunk.length) yield chunk;
};
