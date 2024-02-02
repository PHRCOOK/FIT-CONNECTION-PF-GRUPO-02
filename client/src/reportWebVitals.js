// Definimos la función reportWebVitals
const reportWebVitals = (onPerfEntry) => {
  // Si onPerfEntry es una función, importamos el módulo web-vitals
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Llamamos a cada una de las funciones de web-vitals con onPerfEntry como argumento
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Exportamos la función reportWebVitals para poder usarla en otros lugares de nuestra aplicación
export default reportWebVitals;

// Esta función se ejecuta cuando se inicia la aplicación
