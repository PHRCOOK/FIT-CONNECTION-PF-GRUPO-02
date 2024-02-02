/* eslint-disable react-hooks/rules-of-hooks */
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

// import { getAllCategories } from "../../redux/action";
import logo from "../../assets/img/logo.jpg";
import gym1 from "../../assets/img/gym1.jpg";
import gym2 from "../../assets/img/gym2.jpg";
import gym3 from "../../assets/img/gym3.jpg";
import gym4 from "../../assets/img/gym4.jpg";
import gym5 from "../../assets/img/gym5.jpg";
import gym6 from "../../assets/img/gym6.png";
import { Carousel, Image, Row, Col } from "react-bootstrap";

export default function home() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllCategories());
  // }, []);

  return (
    <Row>
      <Col xs="12">
        <Carousel fade className="bg-dark rounded">
          <Carousel.Item className="text-center bg-dark">
            <Image src={logo} className="rounded object-fit-contain" />
          </Carousel.Item>
          <Carousel.Item className="text-center bg-dark">
            <Image src={gym1} className="rounded object-fit-contain" />
          </Carousel.Item>
          <Carousel.Item className="text-center bg-dark">
            <Image src={gym2} className="rounded object-fit-contain" />
          </Carousel.Item>
          <Carousel.Item className="text-center bg-dark">
            <Image src={gym3} className="rounded object-fit-contain" />
          </Carousel.Item>
          <Carousel.Item className="text-center bg-dark">
            <Image src={gym4} className="rounded object-fit-contain" />
          </Carousel.Item>
          <Carousel.Item className="text-center bg-dark">
            <Image src={gym5} className="rounded object-fit-contain" />
          </Carousel.Item>
          <Carousel.Item className="text-center bg-dark">
            <Image src={gym6} className="rounded object-fit-contain" />
          </Carousel.Item>
        </Carousel>
      </Col>
    </Row>
  );
}
