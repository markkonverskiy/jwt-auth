import React from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchRegister } from "../redux/slices/auth";

const Register = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const resetFormFields = () => {
    const form = document.getElementById("signup-form");
    if (form) {
      form.reset();
    }
  };

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if ("token" in data.payload) {
      resetFormFields();
      return window.localStorage.setItem("token", data.payload.token);
    }
  };

  return (
    <form
      className="signBlock"
      id="signup-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="email"
        placeholder="Enter your Email..."
        {...register("email", { required: "Enter your email" })}
      />
      <input
        type="password"
        placeholder="Enter your Pass..."
        {...register("password", { required: "Enter your pass" })}
      />
      <button className="signBtn" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default Register;
