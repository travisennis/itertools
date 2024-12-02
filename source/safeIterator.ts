/**
 * Wrap an iterator to handle errors
 */
export const safeIterator = function* <T>(
  iterable: Iterable<T>,
  onError: (error: Error) => void,
): Generator<T> {
  try {
    yield* iterable;
  } catch (error) {
    if (error instanceof Error) {
      onError(error);
    } else {
      throw error;
    }
  }
};
