import React from 'react'

const search = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="flex items-center justify-center w-full">
            <div className="flex items-center gap-3 rounded-full border border-gray-700 bg-gray-900 px-5 py-3 w-full max-w-2xl">                <img src="./search.svg" alt="search" />
                <input type="text"
                    placeholder='Search through thousand of movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-full bg-transparent text-white outline-none placeholder:text-gray-500' />
            </div>
        </div>
    )
}

export default search