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
        <img src={logo} alt="" className="rounded-circle" />
      </a>
      {location.pathname !== pathroutes.PRODUCT && (
        <a href={pathroutes.PRODUCT}>
          <button type="button" className=".btn btn-danger">
            Productos
          </button>
        </a>
      )}
      {location.pathname === pathroutes.PRODUCT && (
        <a href={pathroutes.FORMPRODUCT}>
          <button type="button" className=".btn btn-danger">
            Crear Producto
          </button>
        </a>
      )}
      {location.pathname !== pathroutes.SERVICE && (
        <a href={pathroutes.SERVICE}>
          <button type="button" className=".btn btn-danger">
            Servicios
          </button>
        </a>
      )}
      <button type="button" className=".btn btn-danger">
        Carrito de compras
      </button>
      <button type="button" className=".btn btn-danger">
        Conocer Staff
      </button>
      <button type="button" className=".btn btn-danger">
        Login
      </button>
      <button type="button" className=".btn btn-danger">
        Registrate
      </button>
    </div>
  );
}
