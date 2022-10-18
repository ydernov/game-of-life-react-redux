import { ClassNames, css } from "@emotion/react";
import { FC } from "react";

import { useAppDispatch, useAppSelector } from "../redux/store";

import { useRef, useEffect } from "react";
import Cell from "./Cell";
import React from "react";

const Field: FC = () => {
  const { width, height, cellSize, cells } = useAppSelector(
    ({ field: { xCellCount, yCellCount, cellSize, cells } }) => ({
      width: xCellCount * cellSize,
      height: yCellCount * cellSize,
      cellSize,
      cells,
    })
  );

  const dispatch = useAppDispatch();

  // const handleCellClick = (state: boolean) => (cellId: string) => {
  //   dispatch(
  //     changeCellState({
  //       id: cellId,
  //       changes: { state: !state, newborn: !state },
  //     })
  //   );
  // };

  return (
    // <div
    //   style={{
    //     position: "absolute",
    //     width: width,
    //     height: height,
    //     background: "#1C1426",
    //     top: 0,
    //     bottom: 0,
    //     left: 0,
    //     right: 0,
    //     margin: "auto",
    //   }}
    // >
    //   {/* {cells.map((row, yIndex) => (
    //       <tr key={yIndex}>
    //         {row.map((cell, xIndex) => (
    //           <td
    //             key={xIndex}
    //             style={{
    //               boxSizing: "border-box",
    //               width: cellSize,
    //               height: cellSize,
    //               background: cell.state
    //                 ? cell.newborn
    //                   ? "#4FB477"
    //                   : "#21A179"
    //                 : "transparent",
    //             }}
    //           ></td>
    //         ))}
    //       </tr>
    //     ))} */}
    //   {cells.map((row, yIndex) => {
    //     return row.map((cell, xIndex) => (
    //       <Cell
    //         key={"" + yIndex + xIndex}
    //         newborn={cell.newborn}
    //         alive={cell.state}
    //         // onClick={handleCellClick(state)}
    //       />
    //     ));
    //   })}
    // </div>

    <table
      style={{
        position: "absolute",
        width: width,
        height: height,
        background: "#1C1426",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
        borderCollapse: "collapse",
      }}
    >
      <tbody>
        {cells.map((row, yIndex) => (
          <tr key={yIndex}>
            {row.map((cell, xIndex) => (
              <Cell
                key={xIndex}
                state={cell}
                // onClick={handleCellClick(state)}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Field;
