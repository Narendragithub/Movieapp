import React from 'react';
import Movie from './Movie';
import classes from './MoviesList.module.css'
function MoviesList(props) {
    return (
        <ul className={classes['movies-list']}>
            {props.movies.map((movie)=>{
                return <Movie title={movie.title} releaseDate={movie.releaseDate} openingText={movie.openingText}></Movie>

            })}
        </ul>
    );
}

export default MoviesList;