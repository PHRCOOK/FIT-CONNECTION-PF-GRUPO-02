import MembershipCard from "../card_membership/card_membership";
import AdminMembershipCard from "../../administrator/components/AdminMembershipCard/AdminMembershipCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const MembershipsCards = ({ statusSelection }) => {
  const location = useLocation();
  const Card = location.pathname.includes("admin")
    ? AdminMembershipCard
    : MembershipCard;

  const allMemberships = useSelector((state) => state.allMemberships);
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    setMemberships(
      allMemberships.filter((memb) => memb.status === statusSelection)
    );
  }, [allMemberships, statusSelection]);

  return (
    <Row>
      {memberships.map((item) => (
        <Col xs="12" md="6" lg="4" className="p-3" key={item.id}>
          <Card
            id={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
            status={item.status}
            image_url={item.image_url}
          />
        </Col>
      ))}
    </Row>
  );
};

export default MembershipsCards;
