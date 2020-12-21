// import modules
import { useState } from "react";
// import components
import LoginModal from "../Components/Auth/LoginModal";
import RegisterModal from "../Components/Auth/RegisterModal";
// import assets
import iconTitle from "../Images/landing-page-icon.png";
import imgLanding from "../Images/landing-page-img-1.png";
import vector1 from "../Images/Vector1.png";
import vector2 from "../Images/Vector2.png";
import vector3 from "../Images/Vector3.png";

function LandingPage() {
  const [showModal, setShowModal] = useState({ login: false, register: false });

  return (
    <div className="w-screen h-screen max-h-screen grid grid-cols-2 px-32">
      <div className=" flex-col self-center pr-20 z-10">
        <div className="">
          <div className="flex flex-row">
            <h1 className="font-85 leading-none">Ways</h1>
            <img src={iconTitle} alt="title-icon" />
          </div>
          <h1 className="font-85 text-primary leading-none m-title">Gallery</h1>
        </div>
        <div className="mt-5">
          <h3 className="text-3xl font-extrabold">
            show your work to inspire everyone
          </h3>
          <p className="text-sm leading-5 mt-2">
            Ways Exhibition is a website design creators gather to share their
            work with other creators
          </p>
        </div>
        <div className="space-x-4 mt-5">
          <button
            className="min-w-100 bg-primary hover:bg-bold text-white rounded py-1 font-semibold"
            onClick={() => setShowModal({ login: false, register: true })}
          >
            Join Now
          </button>
          <button
            className="min-w-100 bg-gray-300 hover:bg-gray-400 text-black rounded py-1 font-semibold"
            onClick={() => setShowModal({ login: true, register: false })}
          >
            Login
          </button>
        </div>
      </div>
      <div className="self-center">
        <img className="w-full" src={imgLanding} alt="LandingPage" />

        {/* absolute wrap */}
        <img
          src={vector1}
          alt="vector1"
          className="absolute h-1/2 top-0 left-0"
        />
        <img src={vector2} alt="vector2" className="absolute bottom-0 left-0" />
        <img
          src={vector3}
          alt="vector3"
          className="absolute bottom-0 right-0"
        />
        <div className="absolute top-0 left-0 z-20">
          <LoginModal show={showModal.login} setShow={setShowModal} />
          <RegisterModal show={showModal.register} setShow={setShowModal} />
        </div>
        {/* absolute wrap */}
      </div>
    </div>
  );
}

export default LandingPage;
