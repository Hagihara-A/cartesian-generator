export function* cartesian<T>(...args: T[][]): Generator<T[], void, undefined> {
  if (args.length === 0) yield [];
  else {
    const [head, ...rest] = args;
    for (const h of head) {
      const restIter = cartesian(...rest);
      for (const r of restIter) {
        yield [h, ...r];
      }
    }
  }
}
