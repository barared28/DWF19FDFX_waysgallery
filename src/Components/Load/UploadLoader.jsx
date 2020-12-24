import React from "react";

function UploadLoader() {
  return (
    <div className="absolute top-0 left-0 z-30 w-full h-full cursor-wait">
      <div className="h-full w-full flex">
        <div className="my-auto mx-auto flex loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32">
          <h2 className="my-auto mx-auto">Uploading ...</h2>
        </div>
      </div>
    </div>
  );
}

export default UploadLoader;
