import React from "react";
import { ISelectorOptionProps } from "../types/SelectorWidgetTypes";
import { spacesToDash } from "./helpers/helpers";

const SelectorOption: React.FC<ISelectorOptionProps> = ({
  option,
  onUnselect,
}) => {
    const testIdBase = `${spacesToDash(option.label).toLowerCase()}-selector-option`;
  return (
    <div className="selector-option" data-testId={testIdBase}>
      <span>{option.label}</span>
      <button
        onClick={() => onUnselect(option.value)}
        data-testId={`${testIdBase}-remove-button`}
      >
        x
      </button>
    </div>
  );
};

export default SelectorOption;
