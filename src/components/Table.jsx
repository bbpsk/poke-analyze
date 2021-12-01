import React from 'react'

const Table = () => {
    const members = [1,2,3,4,5,6];
    return (
      <div className="border mt-4"> 
        <div className="d-flex justify-content-between p-2 gray">
            <h5>.</h5>
            <h5>Pokemon</h5>
            <h5>Strengths</h5>
            <h5>Weaknesses</h5>
        </div>
        {members.map(number => {
            return <div className='my-2 p-2 border-bottom'>
                <p className=''>#{number}</p>
            </div>
        })}
      </div>
    )
}

export default Table
