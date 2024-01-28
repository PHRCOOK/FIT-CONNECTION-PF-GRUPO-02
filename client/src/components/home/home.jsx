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

export default function home() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllCategories());
  // }, []);

  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      data-bs-interval="1500"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={logo}
            className="d-block w-100 custom-dimensions"
            alt="logo"
          />
        </div>
        <div className="carousel-item">
          <img
            src={gym1}
            className="d-block w-100 custom-dimensions"
            alt="gym1"
          />
        </div>
        <div className="carousel-item">
          <img
            src={gym2}
            className="d-block w-100 custom-dimensions"
            alt="gym2"
          />
        </div>
        <div className="carousel-item">
          <img
            src={gym3}
            className="d-block w-100 custom-dimensions"
            alt="gym3"
          />
        </div>
        <div className="carousel-item">
          <img
            src={gym4}
            className="d-block w-100 custom-dimensions"
            alt="gym4"
          />
        </div>
        <div className="carousel-item">
          <img
            src={gym5}
            className="d-block w-100 custom-dimensions"
            alt="gym5"
          />
        </div>
        <div className="carousel-item">
          <img
            src={gym6}
            className="d-block w-100 custom-dimensions"
            alt="gym6"
          />
        </div>
      </div>
    </div>
  );
}
