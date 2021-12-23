import React from 'react';
import classes from './Movie.module.css'
function Movie(props) {
    return (
        <li id={props.id} className={classes.movie}>
            <h2>{props.title}</h2>
            <h3>{props.releaseDate}</h3>
            <p>{props.openingText}</p> 
        </li>
    );
}

export default Movie;