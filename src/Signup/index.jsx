import React from "react";
import { useForm, useSignUpForm } from "../CustomeHook";

const checkExisting = () => {};
function validate(values) {
  let errors = {};
  if (!values.email) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  return errors;
}

export default function Signup() {
  const login = () => {
    alert(`User Created!
               Name: ${values?.firstName} ${values?.lastName}
               Email: ${values?.email}`);
  };
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
      password: { required: { value: true, message: "Enter password " } },
      confirmPassword: {
        required: { value: true, message: "Enter password " },
        custom: {
          isValid: (enteredValue, allValues) =>
            parseInt(enteredValue.length, 10) >= 9,
          message: "The password must longer then 9",
        },
      },
    },
    onSubmit: (val) => {
      console.log("val :>> ", val);
    },
  });
  return (
    <div>
      {" "}
      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", justifyContent: "center", gap: "72px" }}
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
          <label>Password</label>
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
        <div>
          <label>Re-enter Password</label>
          <input
            type="password"
            onChange={handleChange}
            value={values?.confirmPassword || ""}
            name="confirmPassword"
          />
          {errors?.confirmPassword && (
            <p style={{ color: "red" }}>{errors?.confirmPassword}</p>
          )}
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
