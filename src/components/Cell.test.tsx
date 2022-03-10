import { render, screen, waitFor } from "@testing-library/react";
import Cell from "./Cell";

test("check className", () => {
  const cellId = "cellId";
  render(
    <Cell
      id={cellId}
      alive={false}
      newBorn={false}
      top={0}
      left={0}
      size={20}
    />
  );

  const resultCell = screen.getByRole("div");

  expect(resultCell).toHaveClass("cell");

  expect(resultCell).toHaveStyle({
    top: 0,
    left: 0,
    width: 20,
    height: 20,
  });
});
