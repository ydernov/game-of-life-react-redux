import { FC, useEffect, useState } from "react";
import { changeFieldSize } from "../redux/field";
import { useAppDispatch, useAppSelector } from "../redux/store";
import BurgerButton from "./BurgerButton";

const AppMenu: FC = () => {
  const [isOpen, isOpenSet] = useState(false);
  const { availableFieldSize, xCellCount, yCellCount } = useAppSelector(
    ({
      appSettings: { availableFieldSize },
      field: { xCellCount, yCellCount },
    }) => ({
      availableFieldSize,
      xCellCount,
      yCellCount,
    })
  );

  const [localWidth, localWidthSet] = useState(xCellCount.toString());
  const [localHeight, localHeightSet] = useState(yCellCount.toString());

  useEffect(() => {
    localWidthSet(xCellCount.toString());
  }, [xCellCount]);

  useEffect(() => {
    localHeightSet(yCellCount.toString());
  }, [yCellCount]);

  const dispatch = useAppDispatch();

  const clearVal = (num: string) => num.replace(/\D/g, "");

  const handleChange =
    (
      stateChange: typeof localWidthSet | typeof localHeightSet
    ): React.ChangeEventHandler<HTMLInputElement> =>
    ({ target: { value } }) => {
      stateChange(clearVal(value));
    };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const intWidth = parseInt(localWidth);
    const intHeight = parseInt(localHeight);

    const xCellCount =
      intWidth < availableFieldSize.width ? intWidth : availableFieldSize.width;

    const yCellCount =
      intHeight < availableFieldSize.height
        ? intHeight
        : availableFieldSize.height;

    dispatch(
      changeFieldSize({
        xCellCount,
        yCellCount,
      })
    );
  };

  return (
    <div
      css={{
        position: "absolute",
        zIndex: 100,
        textAlign: "left",
        background: isOpen ? "#F7ECE1" : "none",
        padding: 4,
        borderRadius: 4,
        color: "#1C3144",
      }}
    >
      <BurgerButton
        isOpen={isOpen}
        onClick={() => isOpenSet(!isOpen)}
        color={isOpen ? "#1C3144" : "#F7ECE1"}
      />
      {isOpen ? (
        <>
          <form onSubmit={handleSubmit} css={{ padding: "10px" }}>
            <p
              css={{
                marginTop: 0,
                label: {
                  display: "block",
                  fontSize: "0.9em",
                  marginBottom: "4px",
                },
                input: {
                  display: "block",
                  maxWidth: "100px",
                  fontSize: "1em",
                  boxSizing: "border-box",
                  padding: "4px 6px",
                },
              }}
            >
              <label htmlFor="fieldWidthInput">Field width:</label>
              <input
                type="text"
                value={localWidth}
                id="fieldWidthInput"
                onChange={handleChange(localWidthSet)}
              />
            </p>

            <p
              css={{
                marginTop: 0,
                label: {
                  display: "block",
                  fontSize: "0.9em",
                  marginBottom: "4px",
                },
                input: {
                  display: "block",
                  maxWidth: "100px",
                  fontSize: "1em",
                  boxSizing: "border-box",
                  padding: "4px 6px",
                },
              }}
            >
              <label htmlFor="fieldHeightInput">Field height:</label>
              <input
                type="text"
                value={localHeight}
                id="fieldHeightInput"
                onChange={handleChange(localHeightSet)}
              />
            </p>
            <button type="submit">Apply</button>
          </form>
        </>
      ) : null}
    </div>
  );
};

export default AppMenu;
