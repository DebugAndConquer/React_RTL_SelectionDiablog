import React, { type FC, useEffect, useState } from 'react'
import { FilterFunctionType, ISelectorWidgetOption } from "../types/SelectorWidgetTypes";
import classNames from "classnames";
import { setValuesWrapper } from './helpers/helpers';
import SelectorOptions from './SelectorOptions';
import { ACTIVE_ENTRY, DISABLED_ENTRY_MOD, FILTER_VALUES, MAXIMUM_SELECTED_ENTRIES } from './helpers/variables';
import Search from './Search';
import Filter from './Filter';

interface ISelectorDialogProps {
    onSave: (newValues: ISelectorWidgetOption[]) => void,
    onHide: () => void,
    options: ISelectorWidgetOption[]
}

const SelectorDialog: FC<ISelectorDialogProps> = ({ options, onSave, onHide }) => {
    const [values, setValues] = useState<ISelectorWidgetOption[]>([])
    const [entryClasses, setEntryClasses] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [filterFunction, setFilterFunction] = useState<FilterFunctionType>(() => ((input: ISelectorWidgetOption[]) => input));

    useEffect(() => {
        setValues(options)
    }, [options])

    // Dynamic classnames 
    useEffect(() => {
        setEntryClasses(classNames({
            [ACTIVE_ENTRY]: true,
            [DISABLED_ENTRY_MOD]: values.filter((x) => x.isSelected).length >= MAXIMUM_SELECTED_ENTRIES
        }))
    }, [values])

    const onSelect = (opt: ISelectorWidgetOption): void => {
        if (opt.isSelected === true) {
            setValuesWrapper(opt.value, false, setValues);
        } else if (opt.isSelected === false) {
            setValuesWrapper(opt.value, true, setValues);
        }
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(e.target.value.toLowerCase());
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const valueSelected = e.target.value
        switch (parseInt(valueSelected)) {
            case FILTER_VALUES.FILTER_MORE_THAN_10:
                setFilterFunction(() => ((input: ISelectorWidgetOption[]) => input.filter((v) => v.value > 10)));
                break;
            case FILTER_VALUES.FILTER_MORE_THAN_50:
                setFilterFunction(() => ((input: ISelectorWidgetOption[]) => input.filter((v) => v.value > 50)));
                break;
            case FILTER_VALUES.FILTER_MORE_THAN_100:
                setFilterFunction(() => ((input: ISelectorWidgetOption[]) => input.filter((v) => v.value > 100)));
                break;
            case FILTER_VALUES.FILTER_NONE:
            default:
                setFilterFunction(() => ((input: ISelectorWidgetOption[]) => input));
                break;

        }
    }
    const filteredValues = filterFunction(values).filter((v) => v.label.toLowerCase().includes(search));
    return (
        <div className='selector-dialog'>
            <p>Element Selection Dialog</p>
            <div className="selector-dialog__filters">
                <Search onChange={handleSearch} testId="mainSearchElement"/>
                <Filter onChange={handleFilterChange} testId="mainFilterElement" />
            </div>
            <div className="selector-dialog__entries">
                {values && filteredValues.map((opt) => (
                    <div key={opt.value} onClick={() => onSelect(opt)} className={opt.isSelected ? ACTIVE_ENTRY : entryClasses}>
                        <input type={"checkbox"} readOnly checked={opt.isSelected} />
                        <p>{opt.label}</p>
                    </div>
                ))}
                {
                    values.length > 0 && filteredValues.length === 0 && <p>Nothing matches your query</p>
                }

            </div>
            <p>Currently selected elements:</p>
            <SelectorOptions values={values} handleUnselect={(value) => setValuesWrapper(value, false, setValues)} />
            <div className='selector-dialog__btns'>
                <button className='btn btn--green' onClick={() => onSave(values)}>Save</button>
                <button className='btn btn--red' onClick={() => onHide()}>Cancel</button>
            </div>
        </div>
    )
}

export default SelectorDialog