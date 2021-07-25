import React, {useEffect, useState} from 'react';
import './home.scss';
import {HeaderComponent} from "../../components";
import {MoviesListComponent} from "./index";
import {MOVIES} from "../../constants/movies";
import {MovieApiInterface} from "../../interfaces/movieApiInterface";
import {getMovieById, getMoviesByTitle, getMoviesByYear} from "../../api/api-requests";
import {AxiosResponse} from "axios";
import {isAlphabet, isNumber} from "../../components/search-bar/utils/validations";

function Home() {
  const [filteredList, setFilteredList] = useState<MovieApiInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState<string>('');
  const [page, setPage] = useState<number>(1)
  const [error, setError] = useState<string>('')

  function getMovies() {
    setFilteredList([])
    setPage(1)
    setIsLoading(true)
    setKeyword('')
    const temp = MOVIES.slice(0, 10 * page).map((movie) => {
      return getMovieById(movie.id).then((apiMovie) => {
        return apiMovie.data
      })
    })
    Promise.all(temp).then((values) => {
      setFilteredList([...values])
      setIsLoading(false)
    });
  }

  function handleApi(request: Promise<AxiosResponse>) {
    request.then((result: AxiosResponse) => {
      if (result.data.Error) {
        setError(result.data.Error)
      } else if (result.data.Search) {
        setError('')
      }
      setIsLoading(false);
      setFilteredList(result.data.Search ? filteredList.concat([...result.data.Search]) : []);
    })
  }

  function fetchData(input: string) {
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

  function onLoadMoreClick() {
    setPage(page + 1)
  }

  useEffect(() => {
    if (keyword !== '') {
      fetchData(keyword)
    } else {
      getMovies()
    }
  }, [page, keyword])

  return (
    <>
      <HeaderComponent setFilteredList={setFilteredList}
                       fetchData={fetchData}/>
      {isLoading ?
        <h2>Loading...</h2>
        : error !== '' ?
          <h2>{error}</h2>
          : <MoviesListComponent title={'Top 100 movies of all time'}
                                 movies={filteredList}
                                 onLoadMoreClick={() => onLoadMoreClick()}/>}

    </>
  );
}

export default Home;
