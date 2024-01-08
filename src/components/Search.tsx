import React, { type FC } from 'react'

interface ISearchProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    testId: string
}

const Search: FC<ISearchProps> = ({ onChange, testId }) => {
    return (
        <div>
            <label>Search</label>
            <input type="search" placeholder='Start typing...' onChange={(e) => onChange(e)} data-testId={testId} />
        </div>
    )
}

export default Search