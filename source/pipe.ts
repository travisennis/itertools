export const pipe = <T>(x0: T, ...fns: [(arg: T) => T]) =>
  fns.reduce((x, f) => f(x), x0);
