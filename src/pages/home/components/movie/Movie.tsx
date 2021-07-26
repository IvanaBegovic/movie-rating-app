import React from 'react';
import './movie.scss';
import {MovieApiInterface} from "../../../../interfaces/movieApiInterface";
import {RatingSystemComponent} from "../../../../components";

function Movie({movie = {} as MovieApiInterface, onRatingClick = {} as any}) {

  return (
    <>
      {movie && typeof movie !== 'undefined' ?
        <div className='movie'>
          <img width={300}
               height={450}
               src={movie.Poster}
               alt={movie.Title}/>
          <h3>
            {movie.Title}
          </h3>
          {movie.Plot && <p className='movie__plot'>{movie.Plot}</p>}
          <p><b>Year:</b> {movie.Year}</p>
          {movie.Actors && <p><b>Actors:</b> {movie.Actors}</p>}
          <RatingSystemComponent rating={movie.imdbRating ? +movie.imdbRating / 2 : 0}
                                 onRatingClick={(rating: number) => onRatingClick(movie, rating)}/>
        </div> : null}
    </>
  );
}

export default Movie;
