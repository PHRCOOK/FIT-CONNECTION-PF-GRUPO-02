// import React from "react";
import Card from "../card/card";

const demoItem = [
  {
    id: 1,
    name: "sueter",
    precio: 200,
    description: "para entrenamientos pesados",
    status: true,
    code: "abc123",
    image_url:
      "https://frutocuatro.com/wp-content/uploads/2018/05/camiseta-64000-azul-marino-frente-897x1102.jpg",
    stock: true,
    category: 1,
  },
  {
    id: 2,
    name: "proteina",
    precio: 600,
    description: "ponte mamado con la proteina",
    status: true,
    code: "abc456",
    image_url:
      "https://zonafit.co/wp-content/webpc-passthru.php?src=https://zonafit.co/wp-content/uploads/2023/05/gold-standard-5-lb-french-vanilla-800x800.jpg&nocache=1",
    stock: false,
    category: 3,
  },
];

function Cards() {
  const itemsToShow = demoItem;

  return (
    <div>
      {itemsToShow.map((item) => {
        console.log("entra al map");
        return (
          <Card
            id={item.id}
            key={item.id}
            name={item.name}
            precio={item.precio}
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
