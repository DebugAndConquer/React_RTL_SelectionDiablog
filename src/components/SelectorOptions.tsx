import React, { type FC } from 'react';
import SelectorOption from './SelectorOption'
import { ISelectorWidgetOption } from '../types/SelectorWidgetTypes';

interface ISelectorOptionsProps {
    values: ISelectorWidgetOption[],
    handleUnselect: (value: number) => void
}

const SelectorOptions: FC<ISelectorOptionsProps> = ({ values, handleUnselect }) => {
    return (
        <div className='sel-widget__selected-opt-cont'>
            {values.filter((d) => d.isSelected).length > 0 ?
                values.map((opt) => opt.isSelected && <SelectorOption onUnselect={handleUnselect} option={opt} key={opt.value} />) :
                <p className='no-selected-options'>Selected elements will appear here</p>
            }
        </div>
    )
}

export default SelectorOptions