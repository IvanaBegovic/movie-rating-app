import {child, get, getDatabase, ref, set} from "firebase/database";
import {MovieApiInterface} from "../interfaces/movieApiInterface";

export class DatabaseActions {
  private db: any = getDatabase();

  addRating(movie: MovieApiInterface, rating: number) {
    set(ref(this.db, 'ratings/' + movie.imdbID), {
      id: movie.imdbID,
      rating: movie.imdbRating ? ((+rating + +movie.imdbRating) / 2).toFixed(2) : +rating,
    });
  }

  readRatings(): Promise<any> {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, `ratings`))
  }

  readRatingById(movieId: string): Promise<any> {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, `ratings/${movieId}`))
  }
}

