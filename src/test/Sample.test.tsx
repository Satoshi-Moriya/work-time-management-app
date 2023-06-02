import { add } from '../page/App';

test("add 1 + 2 equal 3", () => {
  expect(add(1, 2)).toBe(3);
})