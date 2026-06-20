import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span
      onClick={onClick}
      style={{
        border: "1px solid gold",
        borderRadius: 5,
        padding: "10px 20px",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "transparent",
        color: selected ? "black" : "white",
        fontWeight: selected ? 700 : 500,
        fontFamily: "Montserrat",
        transition: "all 0.3s",
        display: "inline-block",
        textAlign: "center",
      }}
    >
      {children}
    </span>
  );
};

export default SelectButton;