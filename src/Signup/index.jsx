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
          value: /^w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/,
          message: "Enter a valid email",
        },

        // custom: [{ isValid: (enteredValue) => checkExisting(enteredValue) }],
      },
      firstName: { required: { value: true, message: "Enter first name " } },
      lastName: { required: { value: true, message: "Enter last name " } },
      password: { required: { value: true, message: "Enter password " } },
      confirmPassword: {
        required: { value: true, message: "Enter password " },
        custom: {
          isValid: (enteredValue, allValues) => parseInt(enteredValue, 10) >= 9,
          message: "The password must longer then 10",
        },
      },
    },
    onSubmit: (val) => {
      console.log("val :>> ", val);
    },
  });
  console.log("values :>> ", values, errors);
  return (
    <div>
      {" "}
      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", justifyContent: "center", gap: "72px" }}
      >
        <div>
          <label>First Name</label>
          <input type="text" name="firstName" />
          <label>Last Name</label>
          <input type="text" name="lastName" />
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
