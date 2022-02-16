import { Global } from "@emotion/react";
import { FC, useRef } from "react";
import Cell from "./components/Cell";

const App: FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className={"main-setter"}>
      <Global
        styles={{
          ".main-setter": {
            position: "relative",
            width: "100%",
            height: "100%",
            padding: 0,
            margin: 0,
            overflow: "hidden",
          },
        }}
      />

      <h1>Hello React!</h1>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {[...Array(1000)].map((_, i) => (
          <Cell
            alive={i % 2 === 0}
            newBorn={i % 2 === 0 && (i % 7 === 0 || i % 9 === 0)}
            size={20}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
