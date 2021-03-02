# Cartesian Generator
Produce cartesian product using generator.
## Motivation
You can produce cartesian product in a single-line code. such as:

```javascript
const cartesian = (...args) => args.reduce((acc, cur) => acc.flatMap((x) => cur.map((y) => x.concat([y]))), [[],]);
cartesian([1, 2], [3, 4]) // => [[1,3], [1,4], [2,3], [2,4]]
```

Although this is concise and easy to copy&paste, this functional-way has some problems. 

This way...
   1. uses so much memory, because cartesian product increase exponentially. This may cause memory leak.
   2. needs time to produce entire result __beforehand__.
   3. cause unnecessary computation, especially you want to find certain tuple(element of cartesian product) that matches your demand. Because this way produces entire result __beforehand__

That's why I implemented `cartesian product` with __generator__.Generator produces next tuple when it is necessary.

## How to use
```sh
yarn add cartesian-generator
```

or simply paste this code.
```typescript 
export function* cartesian(
  ...args: number[][]
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

```

```javascript
import { cartesian } from "cartesian-generator";
const prod = cartesian([1, 2], [3, 4]);
for (const p of prod){
    console.log(p) // [1,3], [1,4], [2,3], [2,4]
}
```

## Benchmark
`function version` vs `generator version`(this package).

I tested these two ways with 7 arguments that contains 10 elements, so length of cartesian product is $10^7$.You can see code at `bench.js`.
| version   | time(ms) |
| :-------- | :------- |
| function  | 7126     |
| generator | 5304     |

__26% faster!!__

When I tried bench with more arguments, function version caused memory leak, unlike generator.

## Limits
Currently, this package is typed only with array of number in Typescript(It should work with array of `object, string etc...` actually).If you want, revise code above. Or I might work on it if you post an issue.