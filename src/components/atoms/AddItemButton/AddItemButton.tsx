import React from "react";
import { TAddItemButtonProps } from "./types";

const AddItemButton = ({
  onClick: handleClick,
  children,
}: TAddItemButtonProps): React.ReactNode => (
  <button
    className="bg-[#08bae3] pulsate-fwd hover:bg-[#0880e3] text-white font-bold py-2 px-4 rounded-full pulsate-fwd w-72 h-20 text-xl mb-5"
    type="button"
    onClick={handleClick}
  >
    {children}
  </button>
);

export default AddItemButton;
