import React from "react";
import styles from "../css-modules/nav.module.css";

export default function () {
  return (
    <div>
      <button className={styles.btnNav}>Productos</button>
      <button className={styles.btnNav}>Servicios</button>
      <button className={styles.btnNav}>Carrito de compras</button>
      <button className={styles.btnNav}>Conocer Staff</button>
      <button className={styles.btnNav}>Login</button>
      <button className={styles.btnNav}>Registrate</button>
    </div>
  );
}
