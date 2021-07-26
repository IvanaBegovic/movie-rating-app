import React, {useEffect, useState} from 'react';
import './rating-system.scss';

function RatingSystem({rating = 0, onRatingClick = {} as any}) {
  const [selectedStars, setSelectedStars] = useState<number>(5)

  useEffect(() => {
    setSelectedStars(+rating)
  }, [rating])

  return (
    <div className="rating-system__stars"
         style={{background: `linear-gradient(90deg, #fc0 calc(${selectedStars} / 5 * 100%), #fff calc(${selectedStars} / 5 * 100%)`}}>
      {Array.from(Array(5).keys()).map((index) =>
        <span key={'rating-star-' + index}
              onMouseEnter={() => {
                setSelectedStars(index + 1)
              }}
              onClick={() => {
                onRatingClick(index + 1)
              }}
              onMouseLeave={() => {
                setSelectedStars(rating)
              }}>★
        </span>
      )}
    </div>
  );
}

export default RatingSystem;
