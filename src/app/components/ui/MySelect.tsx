"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

interface Props {
  label: string;
  options: { value: string; label: string }[];
  value: { value: string; label: string };
  onChange: (value: { value: string; label: string }) => void;
  placeholder: string;
}
export default function MySelect({
  label,
  options,
  value,
  onChange,
  placeholder,
  ...rest
}: Props) {
  const id = Date.now().toString();
  const animatedComponents = makeAnimated();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return (
    isMounted && (
      <div className="flex flex-col items-start gap-2 justify-center w-full">
        <label>{label}</label>
        <Select
          {...rest}
          id={id}
          options={options}
          closeMenuOnSelect={true}
          components={animatedComponents}
          placeholder={placeholder}
          className="block p-1 w-full"
          value={value}
          onChange={onChange}
        />
      </div>
    )
  );
}
