import React from "react";

function DetailPageLoad() {
  return (
    <div className="animate-pulse">
      <div className=" sm:px-20 md:px-40 lg:px-80 xl:px-80 mb-16">
        <div className="">
          <div className="flex justify-between">
            <div className="flex flex-row">
              <div className="w-16 h-16 rounded-full bg-blue-100"></div>
              <div className="ml-5 w-16 h-6 bg-blue-100"></div>
            </div>
            <div className="my-auto space-x-5 flex flex-row">
              <div className="min-w-100 h-8 bg-blue-100 rounded"></div>
              <div className="min-w-100 h-8 bg-blue-100 rounded "></div>
            </div>
          </div>
          <div className="w-full mt-6 h-screen bg-blue-100">
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPageLoad;
