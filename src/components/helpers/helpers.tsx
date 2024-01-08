import { ISelectorWidgetOption } from "../../types/SelectorWidgetTypes";

// Immutably updates an isSelected attribute for the entry with provided value
export const setValuesWrapper = (
  value: number,
  isSelected: boolean,
  setter: (value: React.SetStateAction<ISelectorWidgetOption[]>) => void
): void => {
  setter((prev) => {
    return prev.map((el) => {
      // When the value matches the searched one -> update isSelected attribute
      if (el.value === value) {
        return {
          ...el,
          isSelected: isSelected,
        };
        // When no match -> leave as it is
      } else {
        return el;
      }
    });
  });
};

// Generates the specified number of list elements with name 'Element <x>'
export const generateSampleData = (
  numberOfEl: number
): ISelectorWidgetOption[] => {
  const sampleData: ISelectorWidgetOption[] = [];
  for (let i = 1; i <= numberOfEl; i++) {
    sampleData.push({ label: `Element ${i}`, value: i, isSelected: false });
  }
  return sampleData;
};

export const spacesToDash = (initialString: string): string =>
  initialString.replaceAll(" ", "-");
