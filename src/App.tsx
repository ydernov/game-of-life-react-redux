import { Global } from "@emotion/react";
import { FC, useEffect, useRef } from "react";
import AppMenu from "./components/AppMenu";
import ControlPanel from "./components/ControlPanel";
import Field from "./components/Field";
import Stats from "./components/Stats";
import { changeAvailableSize, newGenerationThunk } from "./redux/appSettings";
import { changeFieldSize } from "./redux/field";
import { useAppDispatch, useAppSelector } from "./redux/store";

const baseTimer = 100;

const App: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { cellSize, paused } = useAppSelector(({ appSettings, field }) => ({
    cellSize: field.cellSize,
    paused: appSettings.paused,
  }));

  useEffect(() => {
    const avWidth = Math.floor((ref.current?.clientWidth || 0) / cellSize);
    const avHeight = Math.floor((ref.current?.clientHeight || 0) / cellSize);

    const xCellCount = avWidth < 50 ? avWidth : 50;
    const yCellCount = avHeight < 50 ? avHeight : 50;

    dispatch(
      changeAvailableSize({
        width: avWidth,
        height: avHeight,
      })
    );

    dispatch(
      changeFieldSize({
        xCellCount,
        yCellCount,
      })
    );
  }, []);

  useEffect(() => {
    if (!paused) {
      const interval = setInterval(() => {
        dispatch(newGenerationThunk());
      }, baseTimer);

      return () => {
        clearInterval(interval);
      };
    }
  }, [paused]);

  return (
    <div
      ref={ref}
      className={"main-setter"}
      css={{
        background: "#1C3144",
      }}
    >
      <Global
        styles={{
          ".main-setter": {
            position: "relative",
            width: "100%",
            height: "100%",
            padding: 0,
            margin: 0,
            overflow: "hidden",
            color: "#1C3144",
          },

          ".cell": {
            position: "absolute",
            boxSizing: "border-box",
            cursor: "pointer",

            ":hover": {
              backgroundColor: "#1c3144 !important",
            },
          },

          button: {
            fontSize: 14,
            padding: 6,
            borderRadius: 4,
            verticalAlign: "middle",
            lineHeight: 1,
            cursor: "pointer",
            minWidth: "2em",
            borderColor: "#1C3144",

            ":active": {
              borderColor: "#1C1426",
            },
          },
        }}
      />

      <ControlPanel />
      <Field />

      <Stats />
    </div>
  );
};

export default App;
