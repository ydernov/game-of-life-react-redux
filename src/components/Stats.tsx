import { css } from "@emotion/react";
import { FC } from "react";
import { useAppSelector } from "../redux/store";

const times: number[] = [];
let fps: number = 0;
// https://www.growingwiththeweb.com/2017/12/fast-simple-js-fps-counter.html
function refreshLoop() {
  window.requestAnimationFrame(() => {
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift();
    }
    times.push(now);
    fps = times.length;
    refreshLoop();
  });
}

refreshLoop();

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
      <p style={{ marginTop: 0 }}>FPS: {fps}</p>
      <p>Generation: {generationNumber}</p>
      <p>Alive: {alive}</p>
      <p> Newborn: {newborn}</p>
    </div>
  );
};

export default Stats;
