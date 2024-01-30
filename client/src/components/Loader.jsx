import React from 'react'

const Loader = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', width: '100%', height: '100%' }}>
            <div className='custom-loader'></div>
        </div>

    )
}

export const LoaderForButton = () => <div className='custom-loader-btn'></div>

export default Loader