import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCategories,
  applySettings,
  resetSettings,
} from "../../redux/action";
import deleteUndefined from "./deleteUndefined";

function Filters() {
  // const categories = categoriesDemo;
  const categories = useSelector((state) => state.allCategories);
  const filterSettings = useSelector((state) => state.filterSettings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());

    const settingsToApply = { ...filterSettings };

    deleteUndefined(settingsToApply);

    // console.log(settingsToApply);

    dispatch(applySettings(settingsToApply));
  }, []);

  const handleFilter = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    let settingsToApply = { ...filterSettings };

    settingsToApply = { ...settingsToApply, [key]: value || "" };

    deleteUndefined(settingsToApply);

    console.log(filterSettings);
    console.log(settingsToApply);

    dispatch(applySettings(settingsToApply));
  };

  const handleReset = () => {
    dispatch(resetSettings());
    // dispatch(applySettings(filterSettings));
  };

  return (
    <div>
      Filters
      <div>
        <fieldset>
          <legend>Busqueda</legend>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="off"
            onChange={handleFilter}
            value={filterSettings.name || ""}
          />
          <label htmlFor="code">Code</label>
          <input
            id="code"
            name="code"
            type="text"
            autoComplete="off"
            onChange={handleFilter}
            value={filterSettings.code || ""}
          />
        </fieldset>
        <fieldset>
          <legend>Categoria</legend>
          {categories.map((category, index) => {
            if (!category.is_service) {
              return (
                <div key={index}>
                  <input
                    type="radio"
                    id={category.id}
                    name="category_id"
                    value={category.id}
                    checked={Number(filterSettings.category_id) === category.id}
                    onChange={handleFilter}
                  />
                  <label htmlFor={category.id}>{category.name}</label>
                </div>
              );
            }
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
              value={filterSettings.minPrice || ""}
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
              value={filterSettings.maxPrice || ""}
              onChange={handleFilter}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Orden</legend>
          <div key="ASC">
            <input
              type="radio"
              id="ASC"
              name="sortOrder"
              value="ASC"
              checked={filterSettings.sortOrder === "ASC"}
              onChange={handleFilter}
            />
            <label htmlFor="ASC">Ascendente</label>
          </div>
          <div key="DESC">
            <input
              type="radio"
              id="DESC"
              name="sortOrder"
              value="DESC"
              checked={filterSettings.sortOrder === "DESC"}
              onChange={handleFilter}
            />
            <label htmlFor="DESC">Descendente</label>
          </div>
        </fieldset>
      </div>
      <button onClick={handleReset}>Reset Filters</button>
    </div>
  );
}

export default Filters;
