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
  //const background = alive ? (newBorn ? "#7F4C7B" : "#8D86C9") : "transparent";
  const background = alive ? (newBorn ? "#4FB477" : "#21A179") : "transparent";
  //const border = alive ? (newBorn ? "#CD8CC7" : "#F0A4B8") : "#65507F";

  const handleMouse = () => onClick?.(id);

  return (
    <div
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
