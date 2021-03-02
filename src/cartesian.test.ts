import { cartesian } from "./cartesian";
test("[1,2], [3,4] => [1,3], [1,4], [2,3], [2,4]", () => {
  const prod = cartesian([1, 2], [3, 4]);
  expect(prod.next().value).toEqual([1, 3]);
  expect(prod.next().value).toEqual([1, 4]);
  expect(prod.next().value).toEqual([2, 3]);
  expect(prod.next().value).toEqual([2, 4]);
});
test("[0,1,2,3,4], [5,6,7,8,9] => [0,5](at 0) & [4,5](at 20) & [4,9](at 24)", () => {
  const prod = cartesian([0, 1, 2, 3, 4], [5, 6, 7, 8, 9]);
  expect.assertions(3);
  for (let i = 0; i < 25; i++) {
    const curr = prod.next();
    if (i === 0) expect(curr.value).toEqual([0, 5]);
    else if (i == 20) expect(curr.value).toEqual([4, 5]);
    else if (i == 24) expect(curr.value).toEqual([4, 9]);
  }
});
test("[0,1,2,3,4],[5,6],[7,8,9] => [0,5,7]@0, [0,5,9]@2, [0,6,9]@5, [4,6,9]@29", () => {
  const prod = cartesian([0, 1, 2, 3, 4], [5, 6], [7, 8, 9]);
  expect.assertions(4);
  for (let i = 0; i < 30; i++) {
    const curr = prod.next();
    if (i === 0) expect(curr.value).toEqual([0, 5, 7]);
    else if (i == 2) expect(curr.value).toEqual([0, 5, 9]);
    else if (i == 5) expect(curr.value).toEqual([0, 6, 9]);
    else if (i == 29) expect(curr.value).toEqual([4, 6, 9]);
  }
});
