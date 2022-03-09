import { css } from "@emotion/react";
import { FC } from "react";
import { changePaused, newGenerationThunk } from "../redux/appSettings";
import { populateFieldCells } from "../redux/field";
import { useAppDispatch, useAppSelector } from "../redux/store";
import AppMenu from "./AppMenu";

const ControlPanel: FC = () => {
  const dispatch = useAppDispatch();

  const { paused } = useAppSelector(({ appSettings }) => appSettings);

  const handleClickNextGeneration = () => {
    dispatch(newGenerationThunk());
  };

  const handleClickPause = (paused: boolean) => () => {
    dispatch(changePaused(paused));
  };

  const handleClickPopulate = (clear: boolean) => () => {
    dispatch(populateFieldCells(clear));
  };
  return (
    <div
      css={css({
        position: "absolute",
        textAlign: "center",
        top: 0,
        left: 0,
        right: 0,
        padding: 8,
      })}
    >
      <AppMenu />

      <button onClick={handleClickPause(!paused)}>
        {paused ? "Play" : "Pause"}
      </button>
      <button onClick={handleClickNextGeneration}>Next</button>
      <button onClick={handleClickPopulate(false)}>Generate random</button>
      <button onClick={handleClickPopulate(true)}>Clear</button>
    </div>
  );
};

export default ControlPanel;
