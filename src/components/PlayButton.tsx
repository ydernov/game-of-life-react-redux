import { FC } from "react";
import PauseIcon from "../img/Pause.svg";
import PlayIcon from "../img/Play.svg";

const PlayButton: FC<{
  color?: string;
  pause: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ pause, onClick, color = "black" }) => {
  return (
    <button
      onClick={onClick}
      css={{
        padding: 6,
        borderRadius: 4,
        verticalAlign: "middle",
        lineHeight: 0,
        cursor: "pointer",
      }}
    >
      {pause ? (
        <PauseIcon css={{ height: "1em", fill: "#1C3144" }} />
      ) : (
        <PlayIcon css={{ height: "1em", fill: "#1C3144" }} />
      )}
    </button>
  );
};

export default PlayButton;
