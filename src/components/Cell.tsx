import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { FC } from "react";
import { Cell as CellType } from "../redux/field";

const Cell: FC<{
  state: CellType;
  // onClick?: (id: string) => void;
}> = (props) => {
  //const background = alive ? (newBorn ? "#7F4C7B" : "#8D86C9") : "transparent";
  // const background = alive ? (newborn ? "#4FB477" : "#21A179") : "transparent";
  //const border = alive ? (newBorn ? "#CD8CC7" : "#F0A4B8") : "#65507F";

  //const handleMouse = () => onClick?.(id);

  return (
    // <div className={`cell ${alive ? "alive" : ""} ${newborn ? "newborn" : ""}`}

    //onClick={handleMouse}
    // />
    // <td
    //   className={`cell ${props.state === 1 ? "alive" : ""} ${
    //     props.newborn === 1 ? "newborn" : ""
    //   }`}
    // />
    <td className={"cell"} data-state={props.state} />
    // <rect x={top} y={left} width={size} height={size} fill={background} />
  );
};

// export default Cell;
export default React.memo(Cell, (prev, next) => {
  return prev.state === next.state;
});
