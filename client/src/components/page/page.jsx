import React, { useEffect } from "react";
import createList from "./createList";
import { useDispatch, useSelector } from "react-redux";
import { applySettings } from "../../redux/action";
import deleteUndefined from "../filters/deleteUndefined";
import { Pagination, Row, Col, Button } from "react-bootstrap";

function Page() {
  const totalPages = useSelector((state) => state.totalPages);
  const filterSettings = useSelector((state) => state.filterSettings);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(totalPages);
  }, []);

  const arrayTotalPages = createList(totalPages);

  const handleClick = (page) => {
    const settingsToApply = { ...filterSettings, page };
    deleteUndefined(settingsToApply);
    dispatch(applySettings(settingsToApply));
  };

  const handlePrev = () => {
    let page = Number(filterSettings.page) - 1;
    if (page < 1) {
      page = totalPages; // Si estás en la primera página, vuelve a la última
    }
    const settingsToApply = { ...filterSettings, page };
    deleteUndefined(settingsToApply);
    dispatch(applySettings(settingsToApply));
  };

  const handleNext = () => {
    let page = Number(filterSettings.page) + 1;
    if (page > totalPages) {
      page = 1; // Si estás en la última página, vuelve a la primera
    }
    const settingsToApply = { ...filterSettings, page };
    deleteUndefined(settingsToApply);
    dispatch(applySettings(settingsToApply));
  };

  return (
    <Row className="justify-content-center my-3">
      <Col xs="auto">
        <Pagination>
          <Button variant="secondary" onClick={handlePrev} className="mx-2">
            Atrás
          </Button>
          {arrayTotalPages.map((page) => (
            <Pagination.Item
              key={`page${page}`}
              onClick={() => handleClick(page)}
              active={filterSettings.page === page}
              className="mx-2"
            >
              {page}
            </Pagination.Item>
          ))}
          <Button variant="secondary" onClick={handleNext} className="mx-2">
            Siguiente
          </Button>
        </Pagination>
      </Col>
    </Row>
  );
}

export default Page;
