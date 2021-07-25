import React from 'react';
import './movies-list.scss';
// @ts-ignore
import {MovieComponent} from "../index";
import Button from "../../../../components/button/Button";
import {MovieApiInterface} from "../../../../interfaces/movieApiInterface";

function MoviesList({
                      movies = [] as MovieApiInterface[],
                      title = '',
                      onLoadMoreClick = {} as any
                    }) {
  return (
    <>
      <h2>{title}</h2>
      <div className='movies-list'>
        {movies.map((movie: MovieApiInterface, index: number) =>
          <MovieComponent key={'movie-' + index}
                          movie={movie}/>
        )}
        <div className='movies-list__button'>
          <Button onClick={() => onLoadMoreClick()}
                  text={'Load 10 more movies'}/>
        </div>
      </div>
    </>
  );
}

export default MoviesList;
