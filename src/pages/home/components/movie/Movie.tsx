import React from 'react';
import './movie.scss';
import {MovieApiInterface} from "../../../../interfaces/movieApiInterface";

function Movie({movie = {} as MovieApiInterface}) {
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
        </div> : null}
    </>
  );
}

export default Movie;
