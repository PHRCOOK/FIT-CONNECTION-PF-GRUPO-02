import React from "react";
import Filters from "../components/filters/filters";
import AppCards from "../components/cards/cards";

function Store() {
  return (
    <div>
      {" "}
      <div className="fs-4 mb-3 fw-bold text-center">Nuestros Productos</div>
      <Filters />
      <AppCards />
    </div>
  );
}

export default Store;
