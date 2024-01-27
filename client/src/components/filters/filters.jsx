import React from "react";

const categoriesDemo = ["ropa", "equipamiento", "suplementos"];

function Filters() {
  const categories = categoriesDemo;

  return (
    <div>
      Filters
      <div>
        <fieldset>
          <legend>Search</legend>
          <input type="text" />
        </fieldset>
        <fieldset>
          <legend>Categoria</legend>
          {categories.map((category) => {
            return (
              <div>
                <input
                  type="checkbox"
                  id={category}
                  key={category}
                  name="category"
                  value={category}
                  // checked={filterData.order === "ascending"}
                  // onChange={handleFilter}
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
              id="valorMinimo"
              key="valorMinimo"
              name="valor"
              // value={category}
              // checked={filterData.order === "ascending"}
              // onChange={handleFilter}
            />
          </div>
          <div>
            <label htmlFor="valorMaximo">Valor máximo</label>
            <input
              type="number"
              id="valorMaximo"
              key="valorMaximo"
              name="valor"
              // value={category}
              // checked={filterData.order === "ascending"}
              // onChange={handleFilter}
            />
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default Filters;
