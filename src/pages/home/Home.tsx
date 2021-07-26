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

  function getMoviesFromTop() {
    const DatabaseActionsObject = new DatabaseActions()
    setFilteredList([])
    setPage(1)
    setIsLoading(true)
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

  function handleApi(request: Promise<AxiosResponse>) {
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
              if (index === result.data.Search.length - 1) {
                setFilteredList(filteredList.concat(temp))
              } else if (snapshot.exists()) {
                temp.push({...searchItem, imdbRating: snapshot.val().rating})
              } else {
                temp.push(searchItem)
              }
            })
        })
      }
      setIsLoading(false);
    })
  }

  function getMoviesByKeyword(input: string) {
    setIsLoading(true)
    if (input !== keyword) {
      setFilteredList([])
      setPage(1)
    }
    setKeyword(input)
    if (isNumber(input)) {
      handleApi(getMoviesByYear(+input, page))
    } else if (isAlphabet(input)) {
      handleApi(getMoviesByTitle(input, page))
    }
  }

  function onRatingClick(movie: MovieApiInterface, newRating: number) {
    const DatabaseActionsObject = new DatabaseActions()
    DatabaseActionsObject.addRating(movie, newRating * 2)

    setTimeout(() => {
      getMovies()
    }, 800)
  }

  function onLoadMoreClick() {
    setPage(page + 1)
  }

  function getMovies() {
    if (keyword !== '') {
      getMoviesByKeyword(keyword)
    } else {
      getMoviesFromTop()
    }
  }

  useEffect(() => {
    getMovies()
  }, [page, keyword])


  return (
    <>
      <HeaderComponent setFilteredList={setFilteredList}
                       fetchData={getMoviesByKeyword}/>
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
