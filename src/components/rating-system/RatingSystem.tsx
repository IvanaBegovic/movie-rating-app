import React from 'react';
import './rating-system.scss';

function RatingSystem({rating = 0}) {
  // useEffect(() => {
  //   getMovieById(movieId).then((res: AxiosResponse<MovieApiInterface>) => {
  //     console.log(res);
  //     setMovie(res.data)
  //   })
  // }, [movieId])

  return (
    <div className="rating-system__stars"
         style={{background: `linear-gradient(90deg, #fc0 calc(${rating} / 5 * 100%), #fff var(--percent))`}}/>
  );
}

export default RatingSystem;
