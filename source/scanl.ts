export function* scanl<T>(
  reducer: (a: T, b: T) => T,
  initalVal: T,
  iterator: Iterable<T>,
) {
  let b = initalVal;
  yield b;
  for (const x of iterator) {
    b = reducer(b, x);
    yield b;
  }
}
