export const validate = (input) => {
  const errors = {};
  if (!input.name) {
    errors.name = "It cannot be empty.";
  }
  if (!input.price) {
    errors.price = "It cannot be empty.";
  }
  if (input.description.length > 200) {
    errors.description = "The description cannot exceed 200 characters.";
  }
  if (!input.description) {
    errors.description = "It cannot be empty.";
  }
  if (!input.code) {
    errors.code = "It cannot be empty.";
  }
  if (!input.image_url) {
    errors.image_url = "Upload an image.";
  }
  if (!input.stock) {
    errors.stock = "It cannot be empty.";
  }
  if (!input.category_id) {
    errors.category_id = "Select a category.";
  }
  return errors;
};
export default validate;
