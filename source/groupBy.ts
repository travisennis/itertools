import { isIterable } from "./isIterable.ts";

/**
 *
 */
export const groupBy = function* <T>(
  iterable: Iterable<T> | Iterator<T>,
  fn = (x: T) => x,
): Generator<[T, T[]]> {
  let targetKey: T | undefined;
  let currentKey: T | undefined;
  let currentValue: T | undefined;

  const iter = isIterable(iterable) ? Iterator.from(iterable) : iterable;

  function grouper<T>(key: T): T[] {
    const result: T[] = [];
    while (currentKey === key) {
      result.push(currentValue as T);
      const nextItem = iter.next();
      if (nextItem.done === true) {
        break;
      }
      currentValue = nextItem.value;
      currentKey = fn(currentValue);
    }
    return result;
  }

  let nextItem = iter.next();
  if (nextItem.done) return;

  currentValue = nextItem.value;
  currentKey = fn(currentValue);

  while (true) {
    targetKey = currentKey;
    if (currentKey !== undefined) {
      yield [currentKey, grouper(targetKey)];
    }
    if (currentKey !== targetKey) {
      if (currentValue === undefined) break;
    } else {
      nextItem = iter.next();
      if (nextItem.done) break;
      currentValue = nextItem.value;
      currentKey = fn(currentValue);
    }
  }
};
