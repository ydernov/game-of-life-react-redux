import { Global } from "@emotion/react";
import React, { FC, useRef } from "react";

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
    </div>
  );
};

export default App;
