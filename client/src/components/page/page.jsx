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
    // const page = Number(event.target.value);
    // console.log(event.target);
    console.log(page);

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
    console.log(filterSettings);
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
                onClick={() => {
                  handleClick(page);
                }}
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
  );
}

export default Page;
