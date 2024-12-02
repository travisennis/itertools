export const isIterable = (obj: unknown): obj is Iterable<unknown> =>
  obj !== null && typeof Object(obj)[Symbol.iterator] === "function";
