import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Settings from '../../Utils/Constant';

axios.defaults.baseURL= Settings.URL_BACKEND;
axios.defaults.withCredentials = true


const config = {     
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
}

const LoginForm = ({ setLogged }) => {
  const [Success, setSuccess] = useState(null);
  const [Error, setError] = useState(null);
  const navigate = useNavigate();


  const validationSchema = Yup.object().shape({
    username: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(
        8,
        "Your password must be at least 8 characters long, one letter and one number"
      ),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    const form_data_login = new FormData()
    const grant_type = "password"
    const item = {grant_type, username: values.username, password: values.password}
    for (let key in item) {
        form_data_login.append(key, item[key])
    }

    await axios
      .post("/login", form_data_login)
      .then((response) => {
        navigate("/");
        sessionStorage.setItem("JWT", response.data.access_token);
        setLogged(true);
    
      })
      .catch((err) => {
        setError(err.response.data.detail);
      });

  };

  return (
    <div>
      <div className="container-fluid">
      
          <h1 className="text-2xl text-center font-bold sm:text-3xl">Login</h1>
       
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          <Form className="mx-auto mt-8 mb-0 max-w-md space-y-4">
            {Error && <Alert severity="error">{Error}</Alert>}

            <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Email:
                    </label>
                    <Field
                      type="email"
                      id="username"
                      name="username"
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    />
                    <ErrorMessage
                      name="username"
                      component="small"
                      className="text-red-800"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Password:
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    />
                    <ErrorMessage
                      name="password"
                      component="small"
                      className="text-red-800"
                    />
                  </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                No account ?{" "}
                <NavLink
                  to="/register"
                  className="underline"
                >
                  Sign up
                </NavLink>
              </p>
              <button
                type="submit"
                className="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-purple-300"
              >
                <span className="absolute right-0 translate-x-full transition-transform group-hover:-translate-x-4">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>

                <span className="text-sm font-medium transition-all group-hover:mr-4">
                  Sign in
                </span>
              </button>
            </div>
          </Form>
        </Formik>
      </div>

    </div>
  );
};

export default LoginForm;
