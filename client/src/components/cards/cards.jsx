// import React from "react";
import Card from "../card/card";
import { useSelector } from "react-redux";

function Cards() {
  const productsToShow = useSelector((state) => state.productsToShow);

  return (
    <div>
      {productsToShow.map((item) => {
        return (
          <Card
            id={item.id}
            key={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
            status={item.status}
            code={item.code}
            image_url={item.image_url}
            stock={item.stock}
            category={item.category}
          />
        );
      })}
    </div>
  );
}

export default Cards;
