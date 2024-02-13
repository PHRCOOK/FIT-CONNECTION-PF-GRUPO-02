import React from "react";
import createList from "./createList";
import { useDispatch, useSelector } from "react-redux";
import { applySettings } from "../../redux/action";
import deleteUndefined from "../filters/deleteUndefined";
import { Pagination, Row, Col, Button } from "react-bootstrap";

function Page() {
  const totalPages = useSelector((state) => state.totalPages);
  const filterSettings = useSelector((state) => state.filterSettings);
  const dispatch = useDispatch();

  const arrayTotalPages = createList(totalPages);

  const handleClick = (event) => {
    const page = Number(event.target.value);

    console.log(filterSettings);
    const settingsToApply = { ...filterSettings, page };
    deleteUndefined(settingsToApply);
    console.log(settingsToApply);
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
    <Row>
      <Col>
        <Pagination className="justify-content-center">
          <Button disabled={filterSettings.page === 1} onClick={handlePrev}>
            Atrás
          </Button>
          {arrayTotalPages.map((page) => {
            return (
              <Pagination.Item
                key={`page${page}`}
                disabled={filterSettings.page === page}
                value={page}
                onClick={handleClick}
                active={filterSettings.page === page}
              >
                {page}
              </Pagination.Item>
            );
          })}
          <Button
            disabled={filterSettings.page === totalPages}
            onClick={handleNext}
          >
            Siguiente
          </Button>
        </Pagination>
      </Col>
    </Row>

    // <ul>
    //   <li>
    //     <button disabled={filterSettings.page === 1} onClick={handlePrev}>
    //       Atras
    //     </button>
    //   </li>
    //   {arrayTotalPages.map((page) => {
    //     return (
    //       <li key={`page${page}`}>
    //         <button
    //           disabled={filterSettings.page === page}
    //           value={page}
    //           onClick={handleClick}
    //         >
    //           {page}
    //         </button>
    //       </li>
    //     );
    //   })}
    //   <li>
    //     <button
    //       disabled={filterSettings.page === totalPages}
    //       onClick={handleNext}
    //     >
    //       Adelante
    //     </button>
    //   </li>
    // </ul>
  );
}

export default Page;
