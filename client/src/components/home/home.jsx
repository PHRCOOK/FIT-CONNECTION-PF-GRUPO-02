import React from "react";
import logo from "../img/logo.jpg";
import logo2 from "../img/logo2.jpg";
import logo3 from "../img/logo3.jpg";

export default function home() {
  return (
    <div
      id="carouselExample"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="3500"
    >
      <div className="carousel-inner d-flex align-items-center justify-content-center">
        <div className="carousel-item active">
          <img
            src={logo}
            className="d-block w-1"
            alt="..."
            style={{
              marginLeft: "-250px",
              marginTop: "100px",
              width: "30%",
              height: "auto",
            }}
          />
        </div>
        <div className="carousel-item">
          <img
            src={logo2}
            className="d-block w-1"
            alt="..."
            style={{
              marginLeft: "-250px",
              marginTop: "100px",
              width: "30%",
              height: "auto",
            }}
          />
        </div>
        <div className="carousel-item">
          <img
            src={logo3}
            className="d-block w-1"
            alt="..."
            style={{
              marginLeft: "-250px",
              marginTop: "100px",
              width: "30%",
              height: "auto",
            }}
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
