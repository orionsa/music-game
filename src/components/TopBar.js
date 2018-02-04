import React from 'react'

export default ({children})=>{
    return(
        <div className='top-bar'>
            <h1>Music Game</h1>
            <h3>{children}</h3>
        </div>
    )
}