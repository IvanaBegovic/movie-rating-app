import React, {useEffect, useState} from 'react';
import './home.scss';
import {HeaderComponent} from "../../components";
import {MoviesListComponent} from "./index";
import {MOVIES} from "../../constants/movies";
import {MovieApiInterface} from "../../interfaces/movieApiInterface";
import {getMovieById, getMoviesByTitle, getMoviesByYear} from "../../api/api-requests";
import {AxiosResponse} from "axios";
import {isAlphabet, isNumber} from "../../components/search-bar/utils/validations";
import {DatabaseActions} from "../../database/database-actions";

function Home() {
  const [filteredList, setFilteredList] = useState<MovieApiInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState<string>('');
  const [page, setPage] = useState<number>(1)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    getMovies()
  }, [page, keyword])

  function getMovies(isRating = false) {
    setIsLoading(true)
    setError('');
    if (isRating) {
      setPage(1)
    }
    if (keyword !== '') {
      getMoviesByKeyword(keyword, isRating)
    } else {
      getMoviesFromTop()
    }
  }

  function getMoviesFromTop() {
    const DatabaseActionsObject = new DatabaseActions()
    setFilteredList([])
    setPage(1)
    setKeyword('')
    const temp = MOVIES.slice(0, 10 * page).map((movie) => {
      return getMovieById(movie.id).then((apiMovie) => {
        return DatabaseActionsObject.readRatingById(movie.id)
          .then((snapshot) => {
              if (snapshot.exists()) {
                return {...apiMovie.data, imdbRating: snapshot.val().rating}
              } else {
                return apiMovie.data
              }
            }
          )
      })
    })
    Promise.all(temp).then((values) => {
      setFilteredList([...values])
      setIsLoading(false)
    });
  }

  function handleApi(request: Promise<AxiosResponse>, isRating: boolean = false) {
    const DatabaseActionsObject = new DatabaseActions()

    request.then((result: AxiosResponse) => {
      if (result.data.Error) {
        setError(result.data.Error);
      } else if (result.data.Search) {
        setError('');
        // set rating from firebase
        const temp: MovieApiInterface[] = []
        result.data.Search.forEach((searchItem: MovieApiInterface, index: number) => {
          DatabaseActionsObject.readRatingById(searchItem.imdbID)
            .then((snapshot) => {
              if (snapshot.exists()) {
                temp.push({...searchItem, imdbRating: snapshot.val().rating})
              } else {
                temp.push(searchItem)
              }
              if (index === result.data.Search.length - 1) {
                if (isRating) {
                  setFilteredList([...temp])
                } else {
                  setFilteredList([...filteredList.concat(temp)])
                }
              }
            })
        })
      }
      setIsLoading(false);
    })
  }

  function getMoviesByKeyword(input: string, isRating: boolean = false) {
    if (input !== keyword) {
      setFilteredList([])
      setPage(1)
    }
    setKeyword(input)
    if (input === '') getMoviesFromTop()
    else if (input.length <= 1)
      return
    else {
      if (isNumber(input)) {
        handleApi(getMoviesByYear(+input, page), isRating)
      } else if (isAlphabet(input)) {
        handleApi(getMoviesByTitle(input, page), isRating)
      }
    }
  }

  function onRatingClick(movie: MovieApiInterface, newRating: number) {
    const DatabaseActionsObject = new DatabaseActions()
    DatabaseActionsObject.addRating(movie, newRating * 2)

    setTimeout(() => {
      getMovies(true)
    }, 800)
  }

  function onLoadMoreClick() {
    setPage(page + 1)
  }

  return (
    <>
      <HeaderComponent fetchData={getMoviesByKeyword}/>
      {isLoading ?
        <h2>Loading...</h2>
        : error !== '' ?
          <h2>{error}</h2>
          :
          <MoviesListComponent title={keyword !== '' ? `Search results for "${keyword}"` : 'Top 100 movies of all time'}
                               movies={filteredList}
                               onLoadMoreClick={() => onLoadMoreClick()}
                               onRatingClick={onRatingClick}/>}

    </>
  );
}

export default Home;
