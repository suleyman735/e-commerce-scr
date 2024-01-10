// StarRating.js
import React from 'react';
import './../assests/styles/starrating.css';

const StarRating = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'filled' : 'empty'}>
          &#9733; {/* Unicode character for a solid star */}
        </span>
      );
    }
    return stars;
  };

  return <div className="star-rating">{renderStars()}</div>;
};

export default StarRating;

