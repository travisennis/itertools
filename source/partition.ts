/**
 * Split iterable into two iterables based on predicate
 */
export const partition = <T>(
  iterable: Iterable<T>,
  predicate: (x: T) => boolean,
): [Generator<T>, Generator<T>] => {
  const iterator = Iterator.from(iterable);
  const bufferedValues: [T, boolean][] = [];

  function* generator(wanted: boolean): Generator<T> {
    for (const [value, matches] of bufferedValues) {
      if (matches === wanted) yield value;
    }

    for (const item of iterator) {
      const matches = predicate(item);
      bufferedValues.push([item, matches]);
      if (matches === wanted) yield item;
    }
  }

  return [generator(true), generator(false)];
};
