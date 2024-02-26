import React, { useEffect, useState } from "react";

function Error404() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });
  return (
    <div>
      {loading ? <h1>Cargando</h1> : <h1>No encontrado, Error: 404</h1>}
    </div>
  );
}

export default Error404;
