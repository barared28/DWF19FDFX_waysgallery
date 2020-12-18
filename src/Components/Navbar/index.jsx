// import modules
import React from "react";
import { Link } from "react-router-dom";
// import Components
import Dropdown from "./Dropdown";
// import assets
import logo from "../../Images/logo.png";

function Navbar() {
  return (
    <div className="flex justify-between px-32 py-3 border-b-2 mb-6">
      <div>
        <div>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
      </div>
      <div className="flex flex-row place-self-center space-x-10">
        <div className="self-center">
          <Link to="/upload-post">
            <button className="bg-primary rounded px-5 py-1 text-white font-semibold focus:outline-none hover:bg-bold">
              Upload
            </button>
          </Link>
        </div>
        <div>
          <Dropdown>
            <img
              src={logo}
              alt="profile"
              className="w-16 h-16 rounded-full border-2 border-primary object-cover"
            />
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
