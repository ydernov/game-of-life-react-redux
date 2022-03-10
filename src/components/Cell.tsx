import { FC } from "react";

const Cell: FC<{
  id: string;
  alive: boolean;
  newBorn: boolean;
  size: number;
  top: number;
  left: number;
  onClick?: (id: string) => void;
}> = ({ id, alive, newBorn, size, top, left, onClick }) => {
  const background = alive ? (newBorn ? "#4FB477" : "#21A179") : "transparent";

  const handleMouse = () => onClick?.(id);

  return (
    <div
      id={id}
      className="cell"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: background,
      }}
      onClick={handleMouse}
    />
  );
};

export default Cell;
