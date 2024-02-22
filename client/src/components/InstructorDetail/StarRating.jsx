const StarRating = ({ rating, onRatingChange }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div>
      {stars.map((star) => (
        <span
          key={star}
          onClick={() => onRatingChange(star)}
          style={{
            cursor: "pointer",
            fontSize: "20px",
            color: star <= rating ? "gold" : "gray",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
