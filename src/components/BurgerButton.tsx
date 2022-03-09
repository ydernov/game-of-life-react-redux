import { FC } from "react";

const BurgerButton: FC<{
  color?: string;
  isOpen: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ isOpen, onClick, color = "black" }) => {
  return (
    <button
      onClick={onClick}
      css={{
        padding: 0,
        border: 0,
        background: "none",
        lineHeight: 0,
        cursor: "pointer",
      }}
    >
      <svg
        width="24"
        height="20"
        viewBox="0 0 24 20"
        xmlns="http://www.w3.org/2000/svg"
        css={{
          fill: color,
        }}
      >
        <rect
          width="24"
          height="4"
          css={{
            transform: isOpen ? "rotate(39deg) translate(15%, -10%)" : "none",
            transition: "transform 0.3s ease-out",
          }}
        />
        <rect
          y="8"
          width="24"
          height="4"
          css={{
            opacity: isOpen ? "0" : "1",
            transition: "opacity 0.3s ease-out",
          }}
        />
        <rect
          y="16"
          width="24"
          height="4"
          css={{
            transform: isOpen ? "rotate(-39deg) translate(-37%, -14%)" : "none",
            transition: "transform 0.3s ease-out",
          }}
        />
      </svg>
    </button>
  );
};

export default BurgerButton;
