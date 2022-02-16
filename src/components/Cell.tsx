import { FC } from "react";
import { css } from "@emotion/react";

const Cell: FC<{ alive: boolean; newBorn: boolean; size: number }> = ({
  alive,
  newBorn,
  size,
}) => {
  const background = alive ? (newBorn ? "#7F4C7B" : "#AA6578") : "#1C1426";
  const border = alive ? (newBorn ? "#CD8CC7" : "#F0A4B8") : "#65507F";

  return (
    <div
      css={css({
        width: size,
        height: size,
        border: "2px solid",

        borderColor: border,

        background: background,
      })}
    ></div>
  );
};

export default Cell;
