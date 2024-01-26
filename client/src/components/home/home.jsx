import React from "react";
import logo from "../img/logo.jpg";
import gym1 from "../img/gym1.jpg";
import gym2 from "../img/gym2.jpg";
import gym3 from "../img/gym3.jpg";
import gym4 from "../img/gym4.jpg";
import gym5 from "../img/gym5.jpg";
import gym6 from "../img/gym6.jpg";

export default function home() {
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
