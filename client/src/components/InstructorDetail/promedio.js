function promedio(array) {
  // Verificar que el array no esté vacío para evitar dividir por 0
  if (array.length === 0) {
    return 0;
  }
  const suma = array.reduce((acc, numero) => acc + numero, 0);

  return (suma / array.length).toFixed(1);
}

export default promedio;
