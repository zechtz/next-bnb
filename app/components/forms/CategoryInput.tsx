"use client";

import { IconType } from "react-icons";

export interface CategoryInputProps {
  label: string;
  icon: IconType;
  description?: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {

  return (
    <div
      onClick={() => onClick(label)}
      className={`
        rounded-xl 
        border-2 
        p-4 
        flex
        flex-col
        items-center
        hover:border-black
        transition
        cursor-pointer
        ${selected ? "border-black" : "border-b-neutral-200"}
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
