function createList(number) {
  const array = [];
  for (let i = 1; i <= number; i++) {
    array.push(i);
  }

  return array;
}

export default createList;
