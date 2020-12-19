import { useState } from "react";
import DropzoneUpload from "../Components/Upload/DropzoneUpload";

function SendProjectPage() {
  const [files, setFiles] = useState([]);
  return (
    <div className="px-32 flex justify-between mb-16">
      <div className="w-3/5">
        <DropzoneUpload files={files} setFiles={setFiles} />
      </div>
      <div className="w-2/5 px-10">
        <form className="w-full">
          <textarea
            placeholder="Description"
            name="description"
            rows="5"
            className="py-2 px-4 w-full border-2 border-primary rounded"
          />
          <div className="space-x-5 flex justify-center mt-12">
            <button className="min-w-100 bg-primary text-white rounded py-1 px-2 font-semibold">
                Send Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SendProjectPage;
