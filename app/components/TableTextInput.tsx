"use client";

import React, { ChangeEvent, useState } from "react";
import {
  AgeSchema,
  GenderSchema,
  LususSchema,
  NameSchema,
  OtherSchema,
  SummarySchema,
  TrollTagSchema,
} from "@/app/lib/input-definitions";
import styles from "./TableTextInput.module.css";

interface TTIProps {
  placeholder: string;
}

const handleClass = (inputClass: string) => {
  switch (inputClass) {
    case "Valid":
      return styles.validInput;
    case "Invalid":
      return styles.invalidInput;
    case "Empty":
      return styles.emptyInput;
    default:
      return styles.emptyInput;
  }
};

const handleChange = (
  e: ChangeEvent<HTMLInputElement>,
  setText: React.Dispatch<React.SetStateAction<string>>,
  placeholder: string
) => {
  e.preventDefault();

  const textValue = e.target.value;
  setText(textValue);

  if (textValue == "") {
    return "Empty";
  } else {
    try {
      let newText = "";
      if (placeholder == "NAME:") {
        newText = NameSchema.parse(textValue.toUpperCase()).trim();
      } else if (placeholder == "AGE:") {
        newText = AgeSchema.parse(textValue).trim();
      } else if (placeholder == "GENDER:") {
        newText = GenderSchema.parse(textValue.toUpperCase());
      } else if (placeholder == "TROLLTAG:") {
        newText = TrollTagSchema.parse(textValue).trim();
      } else if (placeholder == "MATESPRIT(S):") {
        newText = NameSchema.parse(textValue.toUpperCase());
      } else if (placeholder == "MOIRAIL(S):") {
        newText = NameSchema.parse(textValue.toUpperCase());
      } else if (placeholder == "AUSPISTICE(S):") {
        newText = NameSchema.parse(textValue.toUpperCase());
      } else if (placeholder == "KISMESIS(ES):") {
        newText = NameSchema.parse(textValue.toUpperCase());
      } else if (placeholder == "LUSUS:") {
        newText = LususSchema.parse(textValue.toUpperCase());
      } else if (placeholder == "OTHER INFORMATION:") {
        newText = OtherSchema.parse(textValue);
      } else if (placeholder == "SUMMARY:") {
        newText = SummarySchema.parse(textValue.toUpperCase());
      } else {
        newText = OtherSchema.parse(textValue);
      }
      setText(newText);
      return "Valid";
    } catch (error) {
      return "Invalid";
    }
  }
};

const TableTextInput = ({ placeholder }: TTIProps) => {
  const [inputText, setInputText] = useState<string>("");
  const [inputClass, setInputClass] = useState<string>("Empty");
  return (
    <div className={handleClass(inputClass)}>
      <input
        value={inputText}
        onChange={(event) => {
          setInputClass(handleChange(event, setInputText, placeholder));
        }}
        placeholder={placeholder}
        type="text"
      />
    </div>
  );
};

export default TableTextInput;
