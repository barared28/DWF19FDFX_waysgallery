// import moduls
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
// import components
import Modal from "../Mikro/Modal";
// import functional
import { registerApi } from "../../Api/index";

function RegisterModal({ show, setShow }) {
  const [showAlert, setShowAlert] = useState(false);
  const query = useQueryClient();
  const email = useRef();
  const password = useRef();
  const fullName = useRef();

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

  const handleRegister = (e) => {
    e.preventDefault();
    const body = {
      email: email.current.value,
      password: password.current.value,
      fullName: fullName.current.value,
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
            <form className="flex space-y-4 flex-col">
              {showAlert && (
                <div className="bg-red-400 px-4 py-2 rounded">
                  <h4 className="text-white font-bold ">Something Wrong</h4>
                </div>
              )}
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="w-64 bg-gray-200 rounded px-4 py-2 border-2 border-primary"
                ref={email}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-64 bg-gray-200 rounded px-4 py-2 border-2 border-primary"
                ref={password}
              />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-64 bg-gray-200 rounded px-4 py-2 border-2 border-primary"
                ref={fullName}
              />
              <div>
                <button
                  className="bg-primary w-full py-2 rounded mt-3 text-white font-semibold"
                  onClick={(e) => handleRegister(e)}
                >
                  Register
                </button>
                <p className="text-center my-4">
                  Already have an account ?{" "}
                  <button
                    className="font-bold focus:outline-none"
                    onClick={() => setShow({ login: true, register: false })}
                  >
                    Klik Here
                  </button>
                </p>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}

export default RegisterModal;
