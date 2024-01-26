/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import validate from "../helpers/validate";

export default function userform() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    let key = [e.target.name];
    let value = e.target.value;
    setForm({ ...form, [key]: value });
    setErrors(validate({ ...form, [key]: value }));
  };

  const handleIsAdminChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, isAdmin: value });
    setErrors(validate({ ...form, isAdmin: value }));
  };

  const enableButton = () => {
    return Object.values(errors).some((error) => error !== "");
  };

  return (
    <div>
      <div>COMPLETE THE FORM TO REGISTER</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>FULLNAME</label>
          <input
            name="fullname"
            placeholder="Enter a name..."
            type="text"
            value={form.fullname}
            onChange={handleChange}
          />
          {errors.fullname && <p>{errors.fullname}</p>}
        </div>
        <div>
          <label>EMAIL</label>
          <input
            name="email"
            placeholder="Enter an email..."
            type="text"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>PASSWORD</label>
          <input
            name="password"
            placeholder="Enter a password..."
            type="text"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <label>IS ADMIN?</label>
          <select
            name="isAdmin"
            defaultValue={"DEFAULT"}
            onChange={handleIsAdminChange}
          >
            <option value="DEFAULT" disabled hidden>
              --
            </option>
            <option value={true}>YES</option>
            <option value={false}>NO</option>
          </select>
          {errors.isAdmin && <p>{errors.isAdmin}</p>}
        </div>
        <button type="submit" disabled={enableButton()}>
          REGISTER
        </button>
      </form>
    </div>
  );
}
