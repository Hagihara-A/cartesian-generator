export function* cartesian<T extends number[][]>(
  ...args: T
): Generator<number[], void, undefined> {
  const len = args.length;
  const [head, ...rest] = args;
  if (len === 1) {
    for (const h of head) {
      yield [h];
    }
  } else {
    for (const h of head) {
      const restIter = cartesian(...rest);
      for (const r of restIter) {
        yield [h, ...r];
      }
    }
  }
}
