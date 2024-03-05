import React from "react";
import { cn } from "../util";

type CheckBoxProps = {
  id: string;
  checked: boolean;
  className?: string;
  onChange: (checked: boolean) => void;
  label: string;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  id,
  checked,
  onChange,
  className,
  label,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default CheckBox;
