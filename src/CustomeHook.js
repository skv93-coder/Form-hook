import { useEffect, useState } from "react";

export const useSignUpForm = (callback) => {
  const [inputs, setInputs] = useState();

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
};

export const useForm = ({ validate, onSubmit, initialValues }) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let valid = true;
    const newErrors = {};

    if (validate) {
      for (const key in validate) {
        const data = values[key];
        const validation = validate[key];
        if (validation?.required && !data) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        if (validation?.pattern && !data?.match(validation?.pattern?.value)) {
          valid = false;
          newErrors[key] = validation?.pattern?.message;
        }
        console.log(
          `newErrors`,
          { newErrors, validate, values },
          validation?.custom?.isValid(1)
        );
        if (validation?.custom && !validation?.custom?.isValid(data, values)) {
          valid = false;
          newErrors[key] = validation?.custom?.message;
        }
      }
    }

    setErrors(newErrors);
    if (onSubmit && !valid) {
      onSubmit(values);
    }
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};
