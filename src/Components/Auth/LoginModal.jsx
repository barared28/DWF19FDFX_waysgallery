// import moduls
import { useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
// import components
import Modal from "../Mikro/Modal";
// import functional
import { loginApi } from "../../Api/index";

function LoginModal({ show, setShow }) {
  const query = useQueryClient();
  const email = useRef();
  const password = useRef();

  const loginMutate = useMutation(loginApi, {
    onSettled: (data, error) => {
      if (data) {
        query.invalidateQueries("user");
      }
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const body = {
      email: email.current.value,
      password: password.current.value,
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
            <form className="flex space-y-4 flex-col">
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
              <div>
                <button
                  onClick={(e) => handleLogin(e)}
                  className="bg-primary w-full py-2 rounded mt-3 text-white font-semibold"
                >
                  Login
                </button>
                <p className="text-center my-4">
                  Don't have an account ?{" "}
                  <button
                    className="font-bold focus:outline-none"
                    onClick={() => setShow({ login: false, register: true })}
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

export default LoginModal;
