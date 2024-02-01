function deleteUndefined(obj) {
  for (let key in obj) {
    if (!obj[key]) {
      delete obj[key];
    }
  }
}

export default deleteUndefined;
