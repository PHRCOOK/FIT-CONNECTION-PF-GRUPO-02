import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormSelect } from "react-bootstrap";

function AdminClients() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allCategories = useSelector((state) => state.allCategories);

  useEffect(() => {
    // dispatch(getAllCategories());
  }, []);

  const [statusSelection, setStatusSelection] = useState(true);

  const handleFilter = (event) => {
    setStatusSelection(event.target.value);

    const handleDelete = async (id) => {
      try {
        // await dispatch(deleteCategory(id));
        window.alert("Categoria borrada correctamente");
      } catch (error) {
        window.alert(error);
      }
    };

    const handleModify = (id) => {
      navigate(`/admin/client/modify/${id}`);
    };

    // const handleCreateUser = () => {
    //   navigate("/admin/category/create");
    // };
  };

  return (
    <div>
      <div>
        <label htmlFor="statusSelect">Seleccionar status</label>
        <FormSelect
          id="statusSelect"
          name="statusSelect"
          onChange={handleFilter}
          aria-label="Default select example"
          value={statusSelection}
        >
          <option id="statusTrue" name="statusTrue" value={true}>
            true
          </option>
          <option id="statusFalse" name="statusFalse" value={false}>
            false
          </option>
        </FormSelect>
      </div>
    </div>
  );
}

export default AdminClients;
