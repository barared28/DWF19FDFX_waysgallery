// import moduls
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
// import components
import Modal from "../Mikro/Modal";
// import functional
import { loginApi } from "../../Api/index";

// scema validation
const loginScema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email Required"),
  password: Yup.string().min(8, "Too Short !!").required("Password Required"),
});

// main function
function LoginModal({ show, setShow }) {
  const [showAlert, setShowAlert] = useState(false);
  const query = useQueryClient();

  const loginMutate = useMutation(loginApi, {
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

  const handleLogin = (values) => {
    const body = {
      email: values.email,
      password: values.password,
    };
    loginMutate.mutate(body);
  };

  return (
    <>
      {show && (
        <Modal
          show={show}
          close={() => setShow({ login: false, register: false })}
        >
          <div>
            <h1 className="my-6 text-4xl font-black text-primary">Login</h1>

            {showAlert && (
              <div className="bg-red-400 px-4 py-2 mb-4 rounded">
                <h4 className="text-white font-bold ">Something Wrong</h4>
              </div>
            )}
            
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginScema}
              onSubmit={(values) => handleLogin(values)}
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
                  <button
                    type="submit"
                    className="bg-primary w-full py-2 rounded mt-3 text-white font-semibold"
                  >
                    Login
                  </button>
                  <div>
                    <p className="text-center my-4">
                      Don't have an account ?{" "}
                      <button
                        className="font-bold focus:outline-none"
                        onClick={() =>
                          setShow({ login: false, register: true })
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

export default LoginModal;
