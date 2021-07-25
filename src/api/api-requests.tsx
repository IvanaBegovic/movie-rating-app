import environment from "../environment";
import axios, {AxiosResponse} from "axios";
import {MovieApiInterface} from "../interfaces/movieApiInterface";

export const api = axios.create({
  headers: {
    "Content-Type": "application/json"
  },
})

export function getMovieById(movieId = ''): Promise<AxiosResponse<MovieApiInterface>> {
  return api.get(`${environment.api.endpoint}&i=${movieId}`)
}

export function getMoviesByTitle(title = '', page = 1): Promise<AxiosResponse> {
  return api.get(`${environment.api.endpoint}&s=${title}&page=${page}`)
}

export function getMoviesByYear(year = 0, page = 1): Promise<AxiosResponse> {
  return api.get(`${environment.api.endpoint}&s=''&y=${year}&page=${page}`)
}
