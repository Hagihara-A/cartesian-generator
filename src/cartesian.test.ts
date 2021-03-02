import { cartesian } from "./cartesian";
test("[1,2], [3,4] => [1,3], [1,4], [2,3], [2,4]", () => {
  const prod = cartesian([1, 2], [3, 4]);
  expect(prod.next().value).toEqual([1, 3]);
  expect(prod.next().value).toEqual([1, 4]);
  expect(prod.next().value).toEqual([2, 3]);
  expect(prod.next().value).toEqual([2, 4]);
});
