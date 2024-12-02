export function* drop<T>(n: number, iterable: Iterable<T>) {
	let i = 0;
	for (const val of iterable) {
		if (i >= n) yield val;
		else i++;
	}
}
