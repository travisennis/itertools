/**
 *
 */
export const repeat = function* <T>(val: T, stop = -1) {
  let count = 0;
  while (true) {
    yield val;
    count++;
    if (stop === count) {
      break;
    }
  }
};
