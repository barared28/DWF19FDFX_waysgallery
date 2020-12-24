// import modules
import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// import components
import Modal from "../Components/Mikro/Modal";
import UploadLoader from "../Components/Load/UploadLoader";
// import assets
import "react-datepicker/dist/react-datepicker.css";
// import functional
import { addHire } from "../Api";

// scema validation
const hireValidation = Yup.object().shape({
  title: Yup.string().min(5, "Too Short !!").required("Title Required"),
  description: Yup.string()
    .min(10, "Too Short !!")
    .required("Description Required"),
  price: Yup.number().required("Price Required"),
  startDate: Yup.date().required("Start Date Required"),
  endDate: Yup.date().required("End Date Required"),
});

// main function
function HiredPage() {
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const router = useHistory();

  const addHireMutation = useMutation(addHire, {
    onSuccess: () => {
      setLoader(false);
      setShowModal(true);
    },
  });

  const dateJson = (date) => {
    const dateNew = new Date(date);
    const jsonDate = dateNew.toJSON();
    return jsonDate;
  };

  const hadleBidding = (values) => {
    const body = {
      title: values.title,
      description: values.description,
      price: values.price,
      startDate: dateJson(values.startDate),
      endDate: dateJson(values.endDate),
      orderTo: id,
    };
    setLoader(true);
    addHireMutation.mutate(body);
  };

  return (
    <>
      <div className="sm:px-20 md:px-40 lg:px-80 xl:px-80 mb-16">
        <Formik
          initialValues={{
            title: "",
            description: "",
            price: "",
            startDate: "",
            endDate: "",
          }}
          validationSchema={hireValidation}
          onSubmit={(values) => hadleBidding(values)}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col">
              {errors.title && touched.title && (
                <p className="text-sm text-red-400 font-semibold">
                  {errors.title}
                </p>
              )}
              <Field
                name="title"
                placeholder="Title"
                className="py-2 px-4 w-full border-2 border-primary rounded bg-gray-200 mb-6"
              />
              {errors.description && touched.description && (
                <p className="text-sm text-red-400 font-semibold">
                  {errors.description}
                </p>
              )}
              <Field
                name="description"
                placeholder="Description"
                className="py-2 px-4 w-full border-2 border-primary rounded bg-gray-200 mb-6"
                as="textarea"
                rows="5"
              />
              <div className="flex justify-between mb-6">
                <div>
                  {errors.startDate && touched.startDate && (
                    <p className="text-sm text-red-400 font-semibold">
                      {errors.startDate}
                    </p>
                  )}
                  <label
                    htmlFor="startDate"
                    className="text-base font-semibold text-gray-400"
                  >
                    Start Date :
                  </label>
                  <Field
                    name="startDate"
                    id="startDate"
                    className="py-2 px-4 w-full border-2 border-primary rounded bg-gray-200"
                    type="date"
                  />
                </div>
                <div>
                  {errors.endDate && touched.endDate && (
                    <p className="text-sm text-red-400 font-semibold">
                      {errors.endDate}
                    </p>
                  )}
                  <label
                    htmlFor="endDate"
                    className="text-base font-semibold text-gray-400"
                  >
                    End Date :
                  </label>
                  <Field
                    name="endDate"
                    id="endDate"
                    className="py-2 px-4 w-full border-2 border-primary rounded bg-gray-200"
                    type="date"
                  />
                </div>
              </div>
              {errors.price && touched.price && (
                <p className="text-sm text-red-400 font-semibold">
                  {errors.price}
                </p>
              )}
              <Field
                name="price"
                placeholder="Price"
                type="number"
                className="py-2 px-4 w-full border-2 border-primary rounded bg-gray-200 mb-6"
              />
              <div className="mt-6 flex justify-center space-x-4">
                <button
                  className="min-w-100 bg-gray-300 text-black rounded py-1 font-semibold"
                  onClick={() => router.push(`/user/${id}`)}
                >
                  Cancel
                </button>
                <button
                  className="min-w-100 bg-primary text-white rounded py-1 font-semibold"
                  type="submit"
                >
                  Bidding
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {showModal && (
        <>
          <Modal
            show={showModal}
            close={() => {
              setShowModal(false);
              router.push("/my-order");
            }}
          >
            <div className="flex flex-col justify-center m-4">
              <h2 className="text-green-400 font-bold text-xl">
                We have sent your offer, please wait for the user to accept it
              </h2>
            </div>
          </Modal>
        </>
      )}
      {loader && <UploadLoader />}
    </>
  );
}

export default HiredPage;
