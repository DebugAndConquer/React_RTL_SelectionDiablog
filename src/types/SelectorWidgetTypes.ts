export interface ISelectorWidgetOption {
  label: string;
  value: number;
  isSelected: boolean;
}

export type FilterFunctionType = (
  input: ISelectorWidgetOption[]
) => ISelectorWidgetOption[];
