/**
 * Error class for iterator failures
 */
export class IteratorError extends Error {
	constructor(
		message: string,
		public readonly originalError: unknown,
		public readonly iteratorIndex: number,
	) {
		super(message);
		this.name = "IteratorError";
	}
}
