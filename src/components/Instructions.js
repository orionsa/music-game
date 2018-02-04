import React from 'react';

export default ()=>{
    return(
        <div className="instructions-wraper">
            <div className="instructions-main-container">
                <h1>Hi Music Lovers</h1>
                <p>Welcome to the most awesome game the world of music has ever seen!!!</p>
                <p>Your goal is to discover the name of the band that released the album whose picture appears on the screen.</p>
                <p>Rules:</p>
                <p>Each game you will have ten questions and for each question you will get three tries. 
                Guessing a successful first attempt will earn you ten points, guessing the second attempt will earn you five points and guessing the third attempt will earn you two points.
                Be careful, an incorrect third guess will drop you 5 points.
                </p>
                <p>Combo Score:</p>
                <p>First guess three times in a row will earn you a bonus of 10 points, nice right? That's not all, guessing another 3 questions in the first attempt will earn you 100 points and so on ...</p>
                <p>Up for the challenge?</p>
            </div>
        </div>
    )
}