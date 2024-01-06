export interface ISelectorWidgetOption {
    label: string,
    value: number,
    isSelected: boolean
}

export interface ISelectorWidgetProps {
    options: ISelectorWidgetOption[],
};

export interface ISelectorOptionProps {
    option: ISelectorWidgetOption,
    onUnselect: (value: number) => void,
}

export interface ISelectorDialogProps {
    onSave: (newValues: ISelectorWidgetOption[]) => void,
    onHide: () => void,
    options: ISelectorWidgetOption[]
}

export interface ISelectorOptionsProps {
    values: ISelectorWidgetOption[],
    handleUnselect: (value: number) => void

}

export interface ISearchProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    testId: string
}

export interface IFilterProps {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    testId: string
}

export type FilterFunctionType = (input: ISelectorWidgetOption[]) => ISelectorWidgetOption[]