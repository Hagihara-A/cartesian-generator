import { cartesian as generator } from "./build/cartesian.js";
const HOF = (...args) =>
  args.reduce((acc, cur) => acc.flatMap((x) => cur.map((y) => x.concat([y]))), [
    [],
  ]);
const mean = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
const compareTime = (HOF, gen) => {
  const time1 = [];
  const time2 = [];
  for (let i = 0; i < 3; i++) {
    const start1 = Date.now();
    HOF();
    const end1 = Date.now();
    time1.push(end1 - start1);

    const start2 = Date.now();
    gen();
    const end2 = Date.now();
    time2.push(end2 - start2);
  }
  console.log("mean of 3 times");
  console.log(`function takes ${mean(time1)}ms`);
  console.log(`generator takes ${mean(time2)}ms`);
};
const arg = [...Array(10)].map((_, i) => i);
const args = [...Array(7)].map(() => arg);

compareTime(
  () => {
    const prod = HOF(...args);
    for (const p of prod) {
    }
  },
  () => {
    const prod = generator(...args);
    for (const p of prod) {
    }
  }
);
