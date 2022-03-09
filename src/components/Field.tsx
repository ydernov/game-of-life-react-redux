import { css } from "@emotion/react";
import { FC } from "react";
import { changeCellState, fieldCellsSelector } from "../redux/field";
import { useAppDispatch, useAppSelector } from "../redux/store";
import Cell from "./Cell";

const Field: FC = () => {
  const { xCellCount, yCellCount, cellSize } = useAppSelector(
    ({ field }) => field
  );

  const cells = useAppSelector(fieldCellsSelector.selectAll);

  const dispatch = useAppDispatch();

  const handleCellClick = (state: boolean) => (cellId: string) => {
    dispatch(
      changeCellState({
        id: cellId,
        changes: { state: !state, newborn: !state },
      })
    );
  };

  return (
    <div
      css={css({
        position: "absolute",
        width: xCellCount * cellSize,
        height: yCellCount * cellSize,
        background: "#1C1426",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
      })}
    >
      {cells.map(({ id, top, left, state, newborn }) => {
        return (
          <Cell
            size={cellSize}
            key={id}
            id={id}
            top={top}
            left={left}
            newBorn={newborn}
            alive={state}
            onClick={handleCellClick(state)}
          />
        );
      })}
    </div>
  );
};

export default Field;
