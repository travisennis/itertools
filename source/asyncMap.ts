/**
 * Make an async iterator that computes the async function using elements from the iterable
 */
export const asyncMap = async function* <T, U>(
  iterable: AsyncIterable<T> | Iterable<T>,
  func: (x: T) => Promise<U> | U,
): AsyncGenerator<U> {
  const asyncIterable =
    Symbol.asyncIterator in iterable
      ? iterable
      : (async function* () {
          yield* iterable as Iterable<T>;
        })();

  for await (const x of asyncIterable) {
    yield await func(x);
  }
};
