import { useState } from "react";
import { useDispatch } from "react-redux";
import { postCategory } from "../../redux/action";

export default function CreateCategory() {
  const dispatch = useDispatch();
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    is_service: false // Cambiado a un valor por defecto de false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "is_service" ? value === "true" : value; // Convertir "true" a true y "false" a false
    setCategoryForm({ ...categoryForm, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(postCategory(categoryForm));
      // Lógica adicional después de crear la categoría si es necesario
      window.alert("Categoría creada exitosamente");
      setCategoryForm({ name: "", is_service: false }); // Reiniciar el formulario
    } catch (error) {
      window.alert("Error al crear la categoría");
    }
  };

  return (
    <div>
      <h2>Crear Nueva Categoría</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="name" value={categoryForm.name} onChange={handleChange} />
        </label>
        <label>
          ¿Es servicio?:
          <select name="is_service" value={String(categoryForm.is_service)} onChange={handleChange}>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </label>
        <button type="submit">Crear Categoría</button>
      </form>
    </div>
  );
}
