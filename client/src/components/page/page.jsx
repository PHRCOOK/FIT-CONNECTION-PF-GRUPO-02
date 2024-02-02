import React from "react";
import createList from "./createList";
import { useDispatch, useSelector } from "react-redux";
import { applySettings } from "../../redux/action";
import deleteUndefined from "../filters/deleteUndefined";

function Page() {
  const totalPages = useSelector((state) => state.totalPages);
  const filterSettings = useSelector((state) => state.filterSettings);
  const dispatch = useDispatch();

  const arrayTotalPages = createList(totalPages);

  const handleClick = (event) => {
    const page = Number(event.target.value);
    // event.preventDefault();
    const settingsToApply = { ...filterSettings, page };
    deleteUndefined(settingsToApply);
    dispatch(applySettings(settingsToApply));
  };

  const handlePrev = (event) => {
    const page = Number(filterSettings.page) - 1;
    const settingsToApply = { ...filterSettings, page };
    deleteUndefined(settingsToApply);
    dispatch(applySettings(settingsToApply));
  };
  const handleNext = (event) => {
    const page = Number(filterSettings.page) + 1;
    const settingsToApply = { ...filterSettings, page };
    deleteUndefined(settingsToApply);
    dispatch(applySettings(settingsToApply));
  };

  return (
    <ul>
      <li>
        <button disabled={filterSettings.page === 1} onClick={handlePrev}>
          Atras
        </button>
      </li>
      {arrayTotalPages.map((page) => {
        return (
          <li key={`page${page}`}>
            <button
              disabled={filterSettings.page === page}
              value={page}
              onClick={handleClick}
            >
              {page}
            </button>
          </li>
        );
      })}
      <li>
        <button
          disabled={filterSettings.page === totalPages}
          onClick={handleNext}
        >
          Adelante
        </button>
      </li>
    </ul>
  );
}

export default Page;
