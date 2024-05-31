import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

import useSignup from '../../hooks/UseSignup';


const Signup = () => {
    const {
       
      FormData,
       
        handleSubmit,
        
    } = useSignup();


    const validationSchema = Yup.object().shape({
      name: Yup.string()
          .trim()
          .required('Required')
          .notOneOf([''], 'Name should not be empty'),
      phoneNumber: Yup.string()
          .trim()
          .required('Required')
          .notOneOf([''], 'Phone number should not be empty'),
      address: Yup.string()
          .trim()
          .required('Required')
          .notOneOf([''], 'Address should not be empty'),
      username: Yup.string()
          .trim()
          .required('Field is required')
          .notOneOf([''], 'Username should not be empty'),
      password: Yup.string()
          .required('Field is required')
          .min(8, 'Password is too short')
          .matches(/[A-Z]/, 'Password should contain at least one uppercase letter')
          .notOneOf([''], 'Password should not be empty'),
  });







    return (
        <DefaultLayout>
            <Breadcrumb pageName="Dahsboard / Authentication/ AddUser" />
            <div>
                <Formik
                    initialValues={FormData}
                    enableReinitialize={true}

                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >

                    {({ isSubmitting }) => (
                        <Form>

                            <div className="flex flex-col gap-9">
                                {/* <!-- Contact Form --> */}
                                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <h3 className="font-medium text-slate-500 text-center text-xl dark:text-slate-400">
                                            Add User
                                        </h3>
                                    </div>




                                    <div className="p-6.5">



                                        <div className="mb-4.5 flex flex-wrap gap-6">

                                            <div className="     w-full">
                                                <label className="mb-2.5 block text-black dark:text-white"> Name</label>
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    placeholder="Enter Name"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="name" component="div" className="text-red-500" />

                                            </div>


                                            <div className="w-full">
                                                <label className="mb-2.5 block text-black dark:text-white"> Phone Number</label>
                                                <Field
                                                    type="text"
                                                    name="phoneNumber"
                                                    placeholder="Enter Phone Number"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="phoneNumber" component="div" className="text-red-500" />

                                            </div>
                                        </div>


                                        <div className="mb-4.5 flex flex-wrap gap-6">

                                            <div className="     w-full">
                                                <label className="mb-2.5 block text-black dark:text-white"> Address</label>
                                                <Field
                                                    type="text"
                                                    name="address"
                                                    placeholder="Enter Address"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="address" component="div" className="text-red-500" />

                                            </div>


                                            <div className="     w-full">
                                                <label className="mb-2.5 block text-black dark:text-white"> Username</label>
                                                <Field
                                                    type="text"
                                                    name="username"
                                                    placeholder="Enter Username "
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="username" component="div" className="text-red-500" />

                                            </div>
                                        </div>



                                        <div className="mb-4.5 flex flex-wrap gap-6 ">

                                            <div className="w-full ">
                                                <label className="mb-2.5 block text-black dark:text-white"> Password</label>
                                                <Field
                                                    type="password"
                                                    name="password"
                                                    placeholder="Enter Password"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-white dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="password" component="div" className="text-red-500" />

                                            </div>



                                        </div>


                                        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4">
                                           Add User
                                        </button>
                                    </div>





                                </div>
                               
                            </div>
                        </Form>
                    )}


                </Formik>

            </div>
        </DefaultLayout >
    )
}

export default Signup
