// import React from "react";

function Card({
  id,
  name,
  price,
  description,
  status,
  code,
  image_url,
  stock,
  category,
}) {
  return (
    <div>
      <h2>id: {id}</h2>
      <h1>name: {name}</h1>
      <h3>price: {price}</h3>
      <p>description: {description}</p>
      <p>code: {code}</p>
      <img src={image_url} alt={name} />
    </div>
  );
}

export default Card;
