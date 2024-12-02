/**
 * Process items in batches with async operations
 */
export const asyncBatch = async function* <T, R>(
	iterable: AsyncIterable<T> | Iterable<T>,
	batchSize: number,
	processor: (batch: T[]) => Promise<R[]>,
): AsyncGenerator<R> {
	const asyncIterable =
		Symbol.asyncIterator in iterable
			? iterable
			: (async function* () {
					yield* iterable as Iterable<T>;
				})();

	let batch: T[] = [];

	for await (const item of asyncIterable) {
		batch.push(item);

		if (batch.length >= batchSize) {
			const results = await processor(batch);
			for (const result of results) {
				yield result;
			}
			batch = [];
		}
	}

	// Process remaining items
	if (batch.length > 0) {
		const results = await processor(batch);
		for (const result of results) {
			yield result;
		}
	}
};
