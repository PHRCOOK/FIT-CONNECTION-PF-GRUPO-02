import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../img/logo.jpg";
import pathroutes from "../helpers/pathroutes";
import "../css-modules/styles.css";

export default function () {
  const location = useLocation();

  return (
    <div className="d-flex flex-column flex-md-row justify-content-center gap-1 gap-md-4">
      <a href={pathroutes.HOME}>
        <img
          src={logo}
          alt=""
          className="rounded-circle"
          style={{ height: "100px", width: "100px" }}
        />
      </a>
      {location.pathname !== pathroutes.PRODUCT && (
        <a href={pathroutes.PRODUCT}>
          <button
            type="button"
            className="btn btn-danger"
            style={{ marginTop: "60px" }}
          >
            Productos
          </button>
        </a>
      )}
      {location.pathname !== pathroutes.SERVICE && (
        <a href={pathroutes.SERVICE}>
          <button
            type="button"
            className="btn btn-danger"
            style={{ marginTop: "60px" }}
          >
            Servicios
          </button>
        </a>
      )}
      <button
        type="button"
        className="btn btn-danger"
        style={{ marginTop: "60px" }}
      >
        Carrito de compras
      </button>
      <button
        type="button"
        className="btn btn-danger"
        style={{ marginTop: "60px" }}
      >
        Conocer Staff
      </button>
      <button
        type="button"
        className="btn btn-danger"
        style={{ marginTop: "60px" }}
      >
        Login
      </button>
      <button
        type="button"
        className="btn btn-danger"
        style={{ marginTop: "60px" }}
      >
        Registrate
      </button>
    </div>
  );
}
