/**
 * Returns a range iterator
 *
 * @param start the number to start the range
 * @param end the number to end the range
 * @param [step] optional step. will default to 1
 */

export const range = function* (
  start: number,
  end: number | undefined = undefined,
  step = 1,
): Generator<number> {
  // If only one argument is provided, assume it's the end value
  let s = start;
  let e = end;
  if (e === undefined) {
    e = start;
    s = 0;
  }

  if (step > 0 && s >= e) {
    return;
  }

  if (step < 0 && s <= e) {
    return;
  }

  yield s;
  yield* range(s + step, e, step);
};
