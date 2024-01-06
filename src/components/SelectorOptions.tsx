import React from 'react';
import { ISelectorOptionsProps } from '../types/SelectorWidgetTypes';
import SelectorOption from './SelectorOption'

const SelectorOptions: React.FC<ISelectorOptionsProps> = ({ values, handleUnselect }) => {
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