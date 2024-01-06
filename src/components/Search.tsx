import { ISearchProps } from '../types/SelectorWidgetTypes'

const Search = ({ onChange, testId }: ISearchProps) => {
    return (
        <div>
            <label>Search</label>
            <input type="search" placeholder='Start typing...' onChange={(e) => onChange(e)} data-testId={testId} />
        </div>
    )
}

export default Search