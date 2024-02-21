import MembershipCard from "../card_membership/card_membership"
import { useSelector, useDispatch } from "react-redux";
import { getAllMemberships } from "../../redux/action";
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";


const MembershipsCards = () => {
  const dispatch = useDispatch();
  const allMemberships = useSelector((state) => state.allMemberships);

  useEffect(() => {
    dispatch(getAllMemberships());
  }, [dispatch]);


  return (
    <Row>
      {allMemberships.map((item) => {
        return (
          <Col xs="12" md="6" lg="4" className="p-3" key={item.id}>
            <MembershipCard
              id={item.id}
              name={item.name}
              price={item.price}
              description={item.description}
              status={item.status}
              image_url={item.image_url}
            />
          </Col>
        );
      })}
    </Row>
  )
}

export default MembershipsCards