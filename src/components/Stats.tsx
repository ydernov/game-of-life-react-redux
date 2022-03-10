import { css } from "@emotion/react";
import { FC } from "react";
import { useAppSelector } from "../redux/store";

const Stats: FC = () => {
  const { generationNumber } = useAppSelector(({ appSettings }) => appSettings);
  const { alive, newborn } = useAppSelector(({ field }) => field);

  return (
    <div
      css={css({
        position: "absolute",
        minWidth: 140,
        top: 0,
        right: 0,
        padding: 8,
        color: "#F7ECE1",
        boxSizing: "border-box",
      })}
    >
      <p style={{ marginTop: 0 }}>Generation: {generationNumber}</p>
      <p>Alive: {alive}</p>
      <p> Newborn: {newborn}</p>
    </div>
  );
};

export default Stats;
