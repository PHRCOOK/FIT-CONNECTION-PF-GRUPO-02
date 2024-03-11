import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap"; // Import Spinner component from react-bootstrap

function Error404() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="text-center mt-5">
      {loading ? (
        <div>
          <h1>Cargando</h1>
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      ) : (
        <h1>No encontrado, Error: 404</h1>
      )}
    </div>
  );
}

export default Error404;
