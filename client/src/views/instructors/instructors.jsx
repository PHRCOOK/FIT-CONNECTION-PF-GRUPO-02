import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInstructors } from "../../redux/action";
import { Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Instructors() {
  const dispatch = useDispatch();

  const allInstructors = useSelector((state) => state.allInstructors);

  useEffect(() => {
    dispatch(getAllInstructors());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // useEffect(() => {
  //   console.log(allInstructors);
  // }, [allInstructors]);

  return (
    <Container>
      <Row xs={1} md={2} className="g-4">
        {allInstructors
          .filter((instructor) => instructor.status)
          .map((instructor) => (
            <Col key={instructor.id}>
              <Link to={`/instructors/${instructor.id}/${instructor.fullname}`}>
                <Card  className="p-3" border="danger" style={{ width: "25rem" }}>
                  <Card.Img
                    variant="top"
                    src={instructor.photo}
                    className="rounded custom-card-img"
                    style={{
                      height: "200px",
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                  <Card.Body>
                    <Card.Title>{instructor.fullname}</Card.Title>
                    <Card.Text>{instructor.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default Instructors;
