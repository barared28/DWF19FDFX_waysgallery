// import moduls
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// import components
import Modal from "../Mikro/Modal";
// import functional
import { registerApi } from "../../Api/index";

// scema validation
const registerValidation = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email Required"),
  password: Yup.string().min(8, "Too Short !!").required("Password Required"),
  fullName: Yup.string().min(4, "Too Short !!").required("Full Name Required"),
});

// main function
function RegisterModal({ show, setShow }) {
  const [showAlert, setShowAlert] = useState(false);
  const query = useQueryClient();

  const registerMutation = useMutation(registerApi, {
    onSettled: (data, error) => {
      if (data) {
        query.invalidateQueries("user");
      }
      if (error) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      }
    },
  });

  const handleRegister = (values) => {
    const body = {
      email: values.email,
      password: values.password,
      fullName: values.fullName,
    };
    registerMutation.mutate(body);
  };

  return (
    <>
      {show && (
        <Modal
          show={show}
          close={() => setShow({ login: false, register: false })}
        >
          <div>
            <h1 className="my-6 text-4xl font-black text-primary">Register</h1>

            {showAlert && (
              <div className="bg-red-400 px-4 py-2 mb-4 rounded">
                <h4 className="text-white font-bold ">Email Alredy Registed</h4>
              </div>
            )}

            <Formik
              initialValues={{ email: "", password: "", fullName: "" }}
              validationSchema={registerValidation}
              onSubmit={(values) => handleRegister(values)}
            >
              {({ errors, touched }) => (
                <Form className="flex flex-col">
                  {errors.email && touched.email && (
                    <p className="text-sm text-red-400 font-semibold">
                      {errors.email}
                    </p>
                  )}
                  <Field
                    name="email"
                    className="w-64 bg-gray-200 rounded px-4 py-2 border-2 border-primary mb-4"
                    placeholder="Email"
                  />
                  {errors.password && touched.password && (
                    <p className="text-sm text-red-400 font-semibold">
                      {errors.password}
                    </p>
                  )}
                  <Field
                    name="password"
                    className="w-64 bg-gray-200 rounded px-4 py-2 border-2 border-primary mb-4"
                    placeholder="Password"
                    type="password"
                  />
                  {errors.fullName && touched.fullName && (
                    <p className="text-sm text-red-400 font-semibold">
                      {errors.fullName}
                    </p>
                  )}
                  <Field
                    name="fullName"
                    className="w-64 bg-gray-200 rounded px-4 py-2 border-2 border-primary mb-4"
                    placeholder="Full Name"
                  />

                  <button
                    type="submit"
                    className="bg-primary w-full py-2 rounded mt-3 text-white font-semibold"
                  >
                    Register
                  </button>

                  <div>
                    <p className="text-center my-4">
                      Already have an account ?{" "}
                      <button
                        className="font-bold focus:outline-none"
                        onClick={() =>
                          setShow({ login: true, register: false })
                        }
                      >
                        Klik Here
                      </button>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal>
      )}
    </>
  );
}

export default RegisterModal;
