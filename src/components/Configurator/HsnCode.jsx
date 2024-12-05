import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Pagination from '../Pagination/Pagination';
import ViewTable from './ViewTable';
import useHsnCode from '../../hooks/useHsnCode';

const HsnCode = () => {
    const {
        HsnCode,
        edit,
        currentHsnCode,
        pagination,
        handleDelete,
        handleUpdate,
        handleSubmit,
        handlePageChange,
    } = useHsnCode();
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Configurator/Add HsnCode" />
            <div>
                <Formik
                    initialValues={currentHsnCode}
                    enableReinitialize={true}
                    validate={values => {
                        const errors = {};

                        if (!values.hsnCodeName ||values.hsnCodeName===" ") {
                            errors.hsnCodeName = 'Hsn Code Cannot Be Null';
                        }
                     
                        return errors;
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="flex flex-col gap-9">
                                {/* Form fields */}
                                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                        <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                                            {edit ? "UPDATE HSN CODE" : "ADD HSN CODE"}
                                        </h3>
                                    </div>
                                    <div className="p-6.5">
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> HSN CODE</label>
                                                <Field
                                                    type="text"
                                                    name="hsnCodeName"
                                                    placeholder="Enter HsnCode Name"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-black dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="hsnCodeName" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> IGST (%)</label>
                                                <Field
                                                    type="number"
                                                    name="igst"
                                                    placeholder="Enter IGST Name"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-black dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="igst" component="div" className="text-red-500" />
                                            </div>
                                        </div>
                                        <div className="mb-4.5 flex flex-wrap gap-6">
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> CGST (%)</label>
                                                <Field
                                                    type="number"
                                                    name="cgst"
                                                    placeholder="Enter cgst Name"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-black dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="cgst" component="div" className="text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-[300px]">
                                                <label className="mb-2.5 block text-black dark:text-white"> SGST (%)</label>
                                                <Field
                                                    type="number"
                                                    name="sgst"
                                                    placeholder="Enter SGST Name"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-slate-700 dark:text-black dark:focus:border-primary"
                                                />
                                                <ErrorMessage name="sgst" component="div" className="text-red-500" />
                                            </div>
                                        </div>
                                        <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4">
                                            {edit ? "UPDATE HSN CODE" : "CREATE HSN CODE"}
                                        </button>
                                    </div>
                                </div>
                                {!edit && (
                                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                        <div className="border-b border-stroke py-4 px-2 dark:border-strokedark">
                                            <h3 className="font-medium text-slate-500 text-center text-xl dark:text-white">
                                                <ViewTable
                                                    units={HsnCode}
                                                    pagination={pagination}
                                                    totalItems={pagination.totalItems}
                                                    title={'HSNCODE'}
                                                    handleDelete={handleDelete}
                                                    handleUpdate={handleUpdate}
                                                />
                                                <Pagination
                                                    totalPages={pagination.totalPages}
                                                    currentPage={pagination.currentPage}
                                                    handlePageChange={handlePageChange}
                                                />
                                            </h3>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </DefaultLayout>
    );
}

export default HsnCode;
