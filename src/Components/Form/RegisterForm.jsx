import React from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import  axios  from 'axios';
import { Alert } from '@mui/material';
import Settings from '../../Utils/Constant';
import { useState } from 'react';


axios.defaults.baseURL= Settings.URL_BACKEND;
axios.defaults.withCredentials = true

const RegisterForm = () => {
    const [Success, setSuccess] = useState(null);
    const [Error, setError] = useState(null);
    const navigate = useNavigate();
    
    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
          .min(3, "Too short")
          .max(50, "Too long")
          .required("First name is required"),
        last_name: Yup.string()
          .min(2, "Too short")
          .max(10, "Too long")
          .required("Last name is required"),
        email: Yup.string().email("Invalid Email").required("Email is required"),
        password: Yup.string()
          .required("Password is required")
          .min(
            8,
            "Your password must be at least 8 characters long, one letter and one number"
          )
          .max(50, "Your password is too long"),
        passwordConfirmation: Yup.string()
          .required("Password confirmation is required")
          .oneOf([Yup.ref("password"), null], "Password does not match"),
      });
    
      const initialValues = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      };
    
      const handleSubmit = async (values) => {
        const response = await axios
          .post("/register", values).then((res) =>{
            navigate("/login");
          })
          .catch((err) => {
            console.log(err);
            setError(err.response.data.detail)
          });
 
      };


    return (
        <div className="container-fluid">
            {Error && <Alert severity="error">{Error}</Alert>}
            <div className="max-w-xl lg:max-w-3xl">
            <h1 className="text-2xl text-center font-bold sm:text-3xl">Inscription</h1>
                <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => handleSubmit(values)}
              >
                
                <Form className="mt-8 grid grid-cols-6 gap-6">
                
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      First Name:
                    </label>
                    <Field
                      type="text"
                      id="first_name"
                      name="first_name"
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    />
                    <ErrorMessage
                      name="first_name"
                      component="small"
                      className="text-red-800"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Last Name:
                    </label>
                    <Field
                      type="text"
                      id="last_name"
                      name="last_name"
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    />
                    <ErrorMessage
                      name="last_name"
                      component="small"
                      className="text-red-800"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Email:
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    />
                    <ErrorMessage
                      name="email"
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
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="passwordConfirmation"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      Confirm password:
                    </label>
                    <Field
                      type="password"
                      id="passwordConfirmation"
                      name="passwordConfirmation"
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    />
                    <ErrorMessage
                      name="passwordConfirmation"
                      component="small"
                      className="text-red-800"
                    />
                  </div>
                
                  <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                    <button
                      type="submit"
                      className="group relative inline-flex items-center overflow-hidden shrink-0 rounded-md bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-800"
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
                        Create an account
                      </span>
                    </button>

                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                      Already have an account?{" "}
                      <NavLink
                        to="/login"
                        className="text-gray-700 underline dark:text-gray-200"
                      >
                        Log in
                      </NavLink>
                      .
                    </p>
                  </div>
                </Form>
              </Formik>
            </div>
        
    </div>
    );
};

export default RegisterForm;