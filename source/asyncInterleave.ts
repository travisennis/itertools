import { IteratorError } from "./IteratorError.ts";

/**
 * Interleaves values from multiple async iterables in a round-robin fashion.
 *
 * @param iterables - Array of async iterables to interleave
 * @returns An async iterator that yields values from the input iterables in alternating order
 *
 * @example
 * ```typescript
 * const iter1 = async function*() {
 *   yield await fetch('api1');
 *   yield await fetch('api2');
 * }();
 * const iter2 = async function*() {
 *   yield await db.query('select 1');
 *   yield await db.query('select 2');
 * }();
 *
 * for await (const value of asyncInterleave(iter1, iter2)) {
 *   console.log(value);
 * }
 * ```
 */
export async function* asyncInterleave<T>(
  iterables: AsyncIterable<T>[],
): AsyncGenerator<T> {
  // Get iterators from all iterables
  const iterators = iterables.map((iterable) =>
    iterable[Symbol.asyncIterator](),
  );

  try {
    while (true) {
      const results = await Promise.allSettled(
        iterators.map((iterator) => iterator.next()),
      );

      // Check if all iterators are done or failed
      if (
        results.every(
          (result) => result.status === "fulfilled" && result.value.done,
        )
      ) {
        break;
      }

      // Handle results and errors
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.status === "fulfilled" && !result.value.done) {
          yield result.value.value;
        } else if (result.status === "rejected") {
          throw new IteratorError(
            `Unrecoverable error in iterator ${i}`,
            result.reason,
            i,
          );
        }
      }
    }
  } finally {
    // Cleanup: return all iterators
    await Promise.allSettled(
      iterators.map(async (iterator) => {
        if (iterator.return) {
          // return() should be valid
          await iterator.return(null);
        }
      }),
    );
  }
}
