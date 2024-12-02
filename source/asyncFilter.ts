/**
 * Make an async iterator that filters elements using an async predicate,
 * with optional concurrent processing
 */
export const asyncFilter = async function* <T>(
	iterable: AsyncIterable<T> | Iterable<T>,
	predicate: (x: T) => Promise<boolean> | boolean,
	concurrency = 1,
): AsyncGenerator<T> {
	const asyncIterable =
		Symbol.asyncIterator in iterable
			? iterable
			: (async function* () {
					yield* iterable as Iterable<T>;
				})();

	// Buffer for managing concurrent operations
	const buffer: Promise<[T, boolean]>[] = [];

	async function processItem(item: T): Promise<[T, boolean]> {
		const result = await predicate(item);
		return [item, result];
	}

	for await (const item of asyncIterable) {
		// Add new item to buffer
		buffer.push(processItem(item));

		// If we've reached concurrency limit, process one item
		if (buffer.length >= concurrency) {
			const [value, keep] = await buffer.shift()!;
			if (keep) yield value;
		}
	}

	// Process remaining items in buffer
	while (buffer.length > 0) {
		const [value, keep] = await buffer.shift()!;
		if (keep) yield value;
	}
};
