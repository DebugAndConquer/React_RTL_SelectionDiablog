import React, { type FC } from 'react'
import { FILTER_VALUES } from './helpers/variables'

interface IFilterProps {
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    testId: string
}

const Filter: FC<IFilterProps> = ({ onChange, testId }) => {
    return (
        <div>
            <label>Filter</label>
            <select onChange={onChange} defaultValue={FILTER_VALUES.FILTER_NONE} data-testId={testId}>
                <option value={FILTER_VALUES.FILTER_NONE}>No filters</option>
                <option value={FILTER_VALUES.FILTER_MORE_THAN_10}>Number &gt; 10</option>
                <option value={FILTER_VALUES.FILTER_MORE_THAN_50}>Number &gt; 50</option>
                <option value={FILTER_VALUES.FILTER_MORE_THAN_100}>Number &gt; 100</option>
            </select>
        </div>
    )
}

export default Filter