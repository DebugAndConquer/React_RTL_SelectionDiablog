import React, { useEffect, useState } from 'react';
import { ISelectorWidgetOption, ISelectorWidgetProps } from "../types/SelectorWidgetTypes";
import { setValuesWrapper } from './helpers/helpers';
import SelectorDialog from './SelectorDialog';
import SelectorOptions from './SelectorOptions';

const SelectorWidget: React.FC<ISelectorWidgetProps> = ({ options }) => {
    const [values, setValues] = useState<ISelectorWidgetOption[]>([]);
    const [showDialog, setShowDialog] = useState<boolean>(false);

    useEffect(() => {
        setValues(options);
    }, [options])

    const saveData = (newValues: ISelectorWidgetOption[]): void => {
        setValues(newValues);
        setShowDialog(false);
    }

    return (
        <div className='sel-widget'>
            <h1>Element selection</h1>
            <p>Number of selected elements: {values.filter((opt) => opt.isSelected).length}</p>
            <SelectorOptions values={values} handleUnselect={(value) => setValuesWrapper(value, false, setValues)} />
            <br />
            <button className='btn btn--green' onClick={() => setShowDialog(!showDialog)}>Change my selection</button>
            {
                showDialog &&
                <SelectorDialog
                    options={values}
                    onSave={saveData}
                    onHide={() => setShowDialog(false)} />
            }
        </div >
    )
}

export default SelectorWidget;