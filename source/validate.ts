/**
 * Validate elements against a predicate, throwing on failure
 */
export const validate = function* <T>(
  iterable: Iterable<T>,
  predicate: (x: T) => boolean,
  errorMessage: string = "Validation failed",
): Generator<T> {
  for (const item of iterable) {
    if (!predicate(item)) {
      throw new Error(`${errorMessage}: ${item}`);
    }
    yield item;
  }
};
