import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllInstructors } from "../../redux/action";
import { Card, Row, Col } from "react-bootstrap";

function Instructors() {
  const dispatch = useDispatch();

  const allInstructors = useSelector((state) => state.allInstructors);

  useEffect(() => {
    dispatch(getAllInstructors());
  }, [dispatch]);

  return (
    <Row xs={1} md={2} className="g-4">
      {allInstructors.map((instructor) => (
        <Col key={instructor.id}>
          <Card ali border="danger" style={{ width: "25rem" }}>
            <Card.Img
              variant="top"
              src={instructor.photo}
              style={{
                width: "300px",
                height: "300px",
                margin: "20px",
                border: "solid",
              }}
            />
            <Card.Body>
              <Card.Title>{instructor.fullname}</Card.Title>
              <Card.Text>{instructor.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Instructors;
