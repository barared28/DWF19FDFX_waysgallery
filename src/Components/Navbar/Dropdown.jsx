import React from "react";
import { useHistory } from "react-router-dom";
import { useQueryClient } from "react-query";

function Dropdown({ children }) {
  const router = useHistory();
  const query = useQueryClient();
  const logout = () => {
    localStorage.removeItem("token");
    query.invalidateQueries("user");
    router.push("/");
  };
  return (
    <div>
      <button className="dropdown focus:outline-none ">
        {children}
        <div className="dropdown-menu hidden absolute mt-3 w-36 bg-white shadow-xl border rounded z-40">
          <div className="flex flex-col">
            <div
              className="text-left px-4 py-3 hover:bg-gray-200 "
              onClick={() => router.push("/my-profile")}
            >
              <p className="font-medium">
                <i className="fas fa-user fa-lg text-primary mr-3"></i> Profile
              </p>
            </div>
            <div
              className="text-left px-4 py-3 hover:bg-gray-200"
              onClick={() => router.push("/my-order")}
            >
              <p className="font-medium">
                <i className="fas fa-cart-arrow-down  text-primary mr-4"></i>
                Order
              </p>
            </div>
            <div className="border"></div>
            <div
              className="text-left px-4 py-3 hover:bg-gray-200"
              onClick={logout}
            >
              <p className="font-medium">
                <i className="fas fa-sign-out-alt fa-lg text-red-500 mr-3"></i>
                Logout
              </p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

export default Dropdown;
