import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategoriesAction } from "../../redux/action";

const categoriesDemo = ["ropa", "equipamiento", "suplementos"];

function Filters() {
  const categories = categoriesDemo;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getCategoriesAction());
  // }, []);

  // const categories = useSelector((state) => state.categories);

  const [filterSettings, setFilterSettings] = useState({
    category_id: 0,
    minPrice: 0,
    maxPrice: 0,
  });

  const handleFilter = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
  };

  return (
    <div>
      Filters
      <div>
        <fieldset>
          <legend>Search</legend>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" autoComplete="off" />
        </fieldset>
        <fieldset>
          <legend>Categoria</legend>
          {categories.map((category) => {
            return (
              <div key={category}>
                <input
                  type="radio"
                  id={category}
                  name="category"
                  value={category}
                  // checked={filterData.order === "ascending"}
                  onChange={handleFilter}
                />
                <label htmlFor={category}>{category}</label>
              </div>
            );
          })}
        </fieldset>
        <fieldset>
          <legend>Valor</legend>
          <div>
            <label htmlFor="valorMinimo">Valor mínimo</label>
            <input
              type="number"
              id="minPrice"
              key="minPrice"
              name="minPrice"
              // value={category}
              // checked={filterData.order === "ascending"}
              onChange={handleFilter}
            />
          </div>
          <div>
            <label htmlFor="valorMaximo">Valor máximo</label>
            <input
              type="number"
              id="maxPrice"
              key="maxPrice"
              name="maxPrice"
              // value={category}
              // checked={filterData.order === "ascending"}
              onChange={handleFilter}
            />
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default Filters;
