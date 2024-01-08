import React, { type FC } from "react";
import { spacesToDash } from "./helpers/helpers";
import { ISelectorWidgetOption } from "../types/SelectorWidgetTypes";

interface ISelectorOptionProps {
  option: ISelectorWidgetOption,
  onUnselect: (value: number) => void,
}

const SelectorOption: FC<ISelectorOptionProps> = ({
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
