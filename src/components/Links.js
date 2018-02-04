import React from 'react';
import {Link} from 'react-router-dom'

export default ()=>{
    return(
        <div className='links-container'>
            <div className='links-item'><Link to='/'>Game</Link></div>
            <div className='links-item'><Link to='/instructions'>Instructions</Link></div>
        </div>
    )
}