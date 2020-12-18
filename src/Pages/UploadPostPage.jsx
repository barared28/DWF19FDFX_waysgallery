import { useState } from "react";
import DropzoneUpload from "../Components/Upload/DropzoneUpload";

function UploadPostPage() {
  const [files, setFiles] = useState([]);
  console.log(files);
  return (
    <div className="px-32 flex justify-between">
      <div className="w-3/5">
        <DropzoneUpload files={files} setFiles={setFiles} />
      </div>
      <div className="w-2/5 px-10">
        <form className="w-full mt-6">
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="py-2 px-4 w-full border-2 border-primary rounded"
          />
          <textarea
            placeholder="Description"
            name="description"
            rows="5"
            className="py-2 px-4 w-full border-2 border-primary rounded mt-8"
          />
          <div className="space-x-5 flex justify-center mt-12">
            <button className="min-w-100 bg-gray-300 text-black rounded py-1 font-semibold">
              Cancel
            </button>
            <button className="min-w-100 bg-primary text-white rounded py-1 font-semibold">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadPostPage;
