/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Product from "../products/products";

import { deleteProduct, getAllProducts } from "../../../redux/action";

function adminstore() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const allProducts = useSelector((state) => state.allProducts);

  return (
    <div>
      <p>desde adminstore</p>
      {allProducts.map((product) => {
        return (
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
            status={product.status}
            code={product.code}
            image_url={product.image_url}
            stock={product.stock}
            category={product.category}
          />
        );
      })}
    </div>
  );
}

export default adminstore;
