import { IFilterProps } from '../types/SelectorWidgetTypes'
import { FILTER_VALUES } from './helpers/variables'

const Filter = ({ onChange, testId }: IFilterProps) => {
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