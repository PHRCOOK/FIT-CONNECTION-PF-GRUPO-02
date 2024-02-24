/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

import {
  postProduct,
  putProduct,
  getAllCategories,
  getAllProducts,
} from "../../redux/action";
import validate from "./validate";
import {
  Container,
  FormControl,
  FormLabel,
  FormText,
  Row,
  Col,
} from "react-bootstrap";

export default function FormProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [disableButton, setDisableButton] = useState(false);
  const allCategories = useSelector((state) => state.allCategories);

  const [currentProduct, setCurrentProduct] = useState({});

  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    description: "",
    status: "",
    brand: "",
    image_url: "",
    stock: "",
    category_id: "",
  });

  const allProducts = useSelector((state) => state.allProducts);

  const fetchProduct = async () => {
    const { id } = params;
    try {
      if (id) {
        const response = await axios(`api/products/${id}`);
        setProductForm(response.data);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No existe producto con ese id",
      });
    }
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [params]);

  useEffect(() => {
    console.log(currentProduct);
  }, [currentProduct]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    let parsedValue = value;

    if (key === "stock" || key === "price") {
      if (isNaN(e.nativeEvent.data)) {
        setErrors({ ...errors, [key]: "Solo se admiten números" });
        return;
      }
      parsedValue = Number(value);
    }

    setProductForm({ ...productForm, [key]: parsedValue });
    setErrors(validate({ ...productForm, [key]: parsedValue }));
  };

  const handleFileChange = (e) => {
    setProductForm({ ...productForm, image_url: e.target.files[0] });
  };

  const createFormData = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    formData.append("prueba", "OK");
    return formData;
  };

  const handleSubmit = async (e) => {
    setDisableButton(true);
    e.preventDefault();
    const validationErrors = validate(productForm);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const formData = await createFormData(productForm);
        if (params.id) {
          await dispatch(putProduct(params.id, productForm));
          Swal.fire({
            icon: "success",
            title: "Proceso Exitoso",
            text: "Producto modificado exitosamente",
          });
        } else {
          await dispatch(postProduct(formData));
          Swal.fire({
            icon: "success",
            title: "Proceso Exitoso",
            text: "Producto creado exitosamente",
          });
        }
        setProductForm({
          name: "",
          price: "",
          description: "",
          status: "",
          brand: "",
          image_url: "",
          stock: "",
          category_id: "",
        });
        navigate("/admin/product/");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "No se pudo crear el producto",
        }).then(() => {
          setDisableButton(false);
        });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div className="fs-4 mb-3 fw-bold text-center">
          {params.id
            ? "Modificación de producto o servicio"
            : "Creación de producto o servicio"}
        </div>
        <Row>
          <Col xs="12" className="pb-3">
            <FormLabel className="form-label">Nombre</FormLabel>
            <FormControl
              type="text"
              name="name"
              className="form-control"
              value={productForm.name}
              onChange={handleChange}
            />
            {errors.name && (
              <FormText className="form-text">{errors.name}</FormText>
            )}
          </Col>
          <Col xs="12" sm="6" md="4" lg="3" className="pb-3">
            <FormLabel className="form-label">Marca</FormLabel>
            <FormControl
              type="text"
              name="brand"
              className="form-control"
              value={productForm.brand}
              onChange={handleChange}
            />
            {errors.brand && (
              <FormText className="form-text">{errors.brand}</FormText>
            )}
          </Col>
          <Col xs="12" sm="6" md="4" lg="3" className="pb-3">
            <FormLabel className="form-label">Categoría</FormLabel>
            <select
              name="category_id"
              className="form-control"
              value={productForm.category_id || "DEFAULT"}
              onChange={handleChange}
            >
              <option value="DEFAULT" disabled hidden>
                --
              </option>
              {allCategories.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name.toUpperCase()}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <FormText className="form-text">{errors.category_id}</FormText>
            )}

            <Link to="/admin/category/create">
              <button className="btn btn-primary mt-3">Crear Categoría</button>
            </Link>
          </Col>
          <Col xs="12" sm="6" md="4" lg="3" className="pb-3">
            <FormLabel className="form-label">Precio</FormLabel>
            <FormControl
              type="text"
              name="price"
              className="form-control"
              value={productForm.price}
              onChange={handleChange}
            />
            {errors.price && (
              <FormText className="form-text">{errors.price}</FormText>
            )}
          </Col>
          <Col xs="12" sm="6" md="4" lg="3" className="pb-3">
            <FormLabel className="form-label">Stock</FormLabel>
            <FormControl
              type="text"
              name="stock"
              className="form-control"
              value={productForm.stock}
              onChange={handleChange}
            />
            {errors.stock && (
              <FormText className="form-text">{errors.stock}</FormText>
            )}
          </Col>
          <Col xs="12" md="8" lg="6" className="pb-3">
            <FormLabel className="form-label">Imagen</FormLabel>
            <FormControl
              type="file"
              name="image_url"
              className="form-control"
              onChange={handleFileChange}
            />
          </Col>
          <Col xs="12" sm="6" md="4" lg="3" className="pb-3">
            <FormLabel className="form-label">Estado</FormLabel>
            <select
              name="status"
              className="form-control"
              value={productForm.status || "DEFAULT"}
              onChange={handleChange}
            >
              <option value="DEFAULT" disabled hidden>
                --
              </option>
              <option value="TRUE">Activo</option>
              <option value="FALSE">Inactivo</option>
            </select>
            {errors.status && (
              <FormText className="form-text">{errors.status}</FormText>
            )}
          </Col>
          <Col xs="12" className="pb-3">
            <FormLabel className="form-label">Descripción</FormLabel>
            <FormControl
              rows="5"
              name="description"
              as="textarea"
              value={productForm.description}
              onChange={handleChange}
              maxLength={201}
            />
            {errors.description && (
              <FormText className="form-text">{errors.description}</FormText>
            )}
          </Col>
          <Col xs="12" className="pb-3">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={
                Object.values(errors).some((error) => error !== "") ||
                Object.values(productForm).some(
                  (value) => value === "" || disableButton
                )
              }
              maxLength={201}
            >
              {params.id ? "Actualizar producto" : "Crear producto"}
            </button>
          </Col>
        </Row>
      </form>
    </Container>
  );
}
