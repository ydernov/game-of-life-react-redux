import { newGenCell } from "./field";

test("true cell, all neighbours true, to be false", () => {
  expect(
    newGenCell(true, [true, true, true, true, true, true, true, true])
  ).toBe(false);
});

test("false cell, all neighbours true, to be false", () => {
  expect(
    newGenCell(false, [true, true, true, true, true, true, true, true])
  ).toBe(false);
});

test("true cell, all neighbours false, to be false", () => {
  expect(
    newGenCell(true, [false, false, false, false, false, false, false, false])
  ).toBe(false);
});

test("false cell, all neighbours false, to be false", () => {
  expect(
    newGenCell(false, [false, false, false, false, false, false, false, false])
  ).toBe(false);
});

// 2
test("true cell, 2 neighbours true, to be true", () => {
  expect(
    newGenCell(true, [true, true, false, false, false, false, false, false])
  ).toBe(true);

  expect(
    newGenCell(true, [true, false, true, false, false, false, false, false])
  ).toBe(true);

  expect(
    newGenCell(true, [true, false, false, true, false, false, false, false])
  ).toBe(true);

  expect(
    newGenCell(true, [true, false, false, false, true, false, false, false])
  ).toBe(true);

  expect(
    newGenCell(true, [true, false, false, false, false, true, false, false])
  ).toBe(true);

  expect(
    newGenCell(true, [true, false, false, false, false, false, true, false])
  ).toBe(true);

  expect(
    newGenCell(true, [true, false, false, false, false, false, false, true])
  ).toBe(true);
});

test("false cell, 2 neighbours true, to be false", () => {
  expect(
    newGenCell(false, [true, true, false, false, false, false, false, false])
  ).toBe(false);

  expect(
    newGenCell(false, [true, false, true, false, false, false, false, false])
  ).toBe(false);

  expect(
    newGenCell(false, [true, false, false, true, false, false, false, false])
  ).toBe(false);

  expect(
    newGenCell(false, [true, false, false, false, true, false, false, false])
  ).toBe(false);

  expect(
    newGenCell(false, [true, false, false, false, false, true, false, false])
  ).toBe(false);

  expect(
    newGenCell(false, [true, false, false, false, false, false, true, false])
  ).toBe(false);

  expect(
    newGenCell(false, [true, false, false, false, false, false, false, true])
  ).toBe(false);
});

// 3
test("true cell, 3 neighbours true, to be true", () => {
  expect(
    newGenCell(true, [true, true, true, false, false, false, false, false])
  ).toBe(true);

  expect(
    newGenCell(true, [true, false, true, true, false, false, false, false])
  ).toBe(true);

  expect(
    newGenCell(true, [true, false, false, true, true, false, false, false])
  ).toBe(true);

  expect(
    newGenCell(true, [true, false, false, false, true, true, false, false])
  ).toBe(true);

  expect(
    newGenCell(true, [true, false, false, false, false, true, true, false])
  ).toBe(true);

  expect(
    newGenCell(true, [true, false, false, false, false, false, true, true])
  ).toBe(true);

  expect(
    newGenCell(true, [true, true, false, false, false, false, false, true])
  ).toBe(true);
});

test("false cell, 3 neighbours true, to be true", () => {
  expect(
    newGenCell(false, [true, true, true, false, false, false, false, false])
  ).toBe(true);

  expect(
    newGenCell(false, [true, false, true, true, false, false, false, false])
  ).toBe(true);

  expect(
    newGenCell(false, [true, false, false, true, true, false, false, false])
  ).toBe(true);

  expect(
    newGenCell(false, [true, false, false, false, true, true, false, false])
  ).toBe(true);

  expect(
    newGenCell(false, [true, false, false, false, false, true, true, false])
  ).toBe(true);

  expect(
    newGenCell(false, [true, false, false, false, false, false, true, true])
  ).toBe(true);

  expect(
    newGenCell(false, [true, true, false, false, false, false, false, true])
  ).toBe(true);
});

// 4
test("true cell, 4 neighbours true, to be false", () => {
  expect(
    newGenCell(true, [true, true, true, true, false, false, false, false])
  ).toBe(false);

  expect(
    newGenCell(true, [true, false, true, true, true, false, false, false])
  ).toBe(false);

  expect(
    newGenCell(true, [true, false, false, true, true, true, false, false])
  ).toBe(false);

  expect(
    newGenCell(true, [true, false, false, false, true, true, true, false])
  ).toBe(false);

  expect(
    newGenCell(true, [true, false, false, false, false, true, true, true])
  ).toBe(false);

  expect(
    newGenCell(true, [true, true, false, false, false, false, true, true])
  ).toBe(false);

  expect(
    newGenCell(true, [true, true, true, false, false, false, false, true])
  ).toBe(false);
});

test("false cell, 4 neighbours true, to be false", () => {
  expect(
    newGenCell(false, [true, true, true, true, false, false, false, false])
  ).toBe(false);

  expect(
    newGenCell(false, [true, false, true, true, true, false, false, false])
  ).toBe(false);

  expect(
    newGenCell(false, [true, false, false, true, true, true, false, false])
  ).toBe(false);

  expect(
    newGenCell(false, [true, false, false, false, true, true, true, false])
  ).toBe(false);

  expect(
    newGenCell(false, [true, false, false, false, false, true, true, true])
  ).toBe(false);

  expect(
    newGenCell(false, [true, true, false, false, false, false, true, true])
  ).toBe(false);

  expect(
    newGenCell(false, [true, true, true, false, false, false, false, true])
  ).toBe(false);
});

// 5
test("true cell, 5 neighbours true, to be false", () => {
  expect(
    newGenCell(true, [true, true, true, true, true, false, false, false])
  ).toBe(false);

  expect(
    newGenCell(true, [true, false, true, true, true, true, false, false])
  ).toBe(false);

  expect(
    newGenCell(true, [true, false, false, true, true, true, true, false])
  ).toBe(false);

  expect(
    newGenCell(true, [true, false, false, false, true, true, true, true])
  ).toBe(false);

  expect(
    newGenCell(true, [true, true, false, false, false, true, true, true])
  ).toBe(false);

  expect(
    newGenCell(true, [true, true, true, false, false, false, true, true])
  ).toBe(false);

  expect(
    newGenCell(true, [true, true, true, true, false, false, false, true])
  ).toBe(false);
});

test("false cell, 5 neighbours true, to be false", () => {
  expect(
    newGenCell(false, [true, true, true, true, true, false, false, false])
  ).toBe(false);

  expect(
    newGenCell(false, [true, false, true, true, true, true, false, false])
  ).toBe(false);

  expect(
    newGenCell(false, [true, false, false, true, true, true, true, false])
  ).toBe(false);

  expect(
    newGenCell(false, [true, false, false, false, true, true, true, true])
  ).toBe(false);

  expect(
    newGenCell(false, [true, true, false, false, false, true, true, true])
  ).toBe(false);

  expect(
    newGenCell(false, [true, true, true, false, false, false, true, true])
  ).toBe(false);

  expect(
    newGenCell(false, [true, true, true, true, false, false, false, true])
  ).toBe(false);
});
