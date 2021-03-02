import { cartesian as  generator } from "./build/cartesian.js";
const HOF = (...args) =>
  args.reduce((acc, cur) => acc.flatMap((x) => cur.map((y) => x.concat([y]))), [
    [],
  ]);
const time = (fn) => {
  const start = Date.now();
  fn();
  const end = Date.now();
  console.log(`${end - start}ms`);
};
const arg = [...Array(10)].map((_, i) => i);
const args = [...Array(7)].map(() => arg);
time(() => {
  console.log("generator-----");
  const prod = generator(...args);
  for (const i of prod) {
  }
});
time(() => {
  console.log("function-----");
  const prod = HOF(...args);
  for (const i of prod) {
  }
});
