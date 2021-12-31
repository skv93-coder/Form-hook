import React from "react";
import { useForm } from "./CustomeHook";

import "./index.css";

export default function Signup() {
  const { values, handleChange, handleSubmit, errors } = useForm({
    initialValues: { email: "eg@gmail.com" },
    validate: {
      email: {
        required: {
          value: true,
          message: "Email is required",
        },
        pattern: {
          value:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: "Enter a valid email",
        },
      },
      firstName: { required: { value: true, message: "Enter first name " } },
      lastName: { required: { value: true, message: "Enter last name " } },
      password: {
        required: { value: true, message: "Enter password " },
        custom: {
          isValid: (enteredValue, allValues) =>
            parseInt(enteredValue?.length, 10) >= 9,
          message: "The password must longer then 9",
        },
      },
    },
    onSubmit: (val) => {
      console.log("val :>> ", val);
      alert();
    },
  });
  return (
    <div>
      {" "}
      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", justifyContent: "center" }}
      >
        <div>
          <label>First Name</label>
          <input
            onChange={handleChange}
            value={values?.firstName || ""}
            type="text"
            name="firstName"
          />
          {errors?.firstName && (
            <p style={{ color: "red" }}>{errors?.firstName}</p>
          )}
        </div>
        <div>
          <label>Last Name</label>
          <input
            onChange={handleChange}
            value={values?.lastName || ""}
            type="text"
            name="lastName"
          />
          {errors?.lastName && (
            <p style={{ color: "red" }}>{errors?.lastName}</p>
          )}
        </div>

        <div>
          <label>Email Address</label>
          <input
            type="email"
            onChange={handleChange}
            value={values?.email || ""}
            name="email"
          />
          {errors?.email && <p style={{ color: "red" }}>{errors?.email}</p>}
        </div>

        <div>
          <label>Re-enter Password</label>
          <input
            type="password"
            onChange={handleChange}
            value={values?.password || ""}
            name="password"
          />
          {errors?.password && (
            <p style={{ color: "red" }}>{errors?.password}</p>
          )}
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
