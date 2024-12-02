/**
 * Make an iterator that aggregates elements from each of the iterables.
 */

export const zip = function* <T, U>(
  iterable1: Iterable<T>,
  iterable2: Iterable<U>,
): Generator<[T, U]> {
  const it1 = Iterator.from(iterable1);
  const it2 = Iterator.from(iterable2);
  while (true) {
    const x = it1.next();
    const y = it2.next();
    if (!(x.done || y.done)) {
      yield [x.value, y.value];
    } else {
      break;
    }
  }
};
