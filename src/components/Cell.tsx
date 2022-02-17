import { FC } from "react";
import { css } from "@emotion/react";

const Cell: FC<{
  alive: boolean;
  newBorn: boolean;
  size: number;
  top: number;
  bottom: number;
}> = ({ alive, newBorn, size, top, bottom }) => {
  const background = alive ? (newBorn ? "#7F4C7B" : "#AA6578") : "#1C1426";
  const border = alive ? (newBorn ? "#CD8CC7" : "#F0A4B8") : "#65507F";

  return (
    <div
      css={css({
        width: size,
        height: size,
        border: "2px solid",
        position: "absolute",
        top,
        bottom,

        borderColor: border,

        background: background,
      })}
    ></div>
  );
};

export default Cell;
