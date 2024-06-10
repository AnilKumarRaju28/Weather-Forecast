import React from 'react'

const TopButtons = ({ setQuery }) => {
    const cities = [{
        id: 1,
        name: 'New York'
    }, {
        id: 2,
        name: 'London'
    }, {
        id: 3,
        name: 'Delhi'
    }, {
        id: 4,
        name: 'Singapore'
    }, {
        id: 5,
        name: 'Tokyo'
    }]
    return (
        <div className='flex items-center justify-around mt-2'>
            {
                cities.map((city) => (
                    <button key={city.id}
                        className='text-xl font-medium hover:bg-gray-700/20 px-3 py-2 rounded-lg transition ease-out'
                        onClick={() => setQuery({ q: city.name })}>
                        {city.name}
                    </button>
                ))
            }

        </div>
    )
}

export default TopButtons
