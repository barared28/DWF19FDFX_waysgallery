// import modules
import { useState, useRef } from "react";
import { useMutation } from "react-query";
// import components
import DropzoneUpload from "../Components/Upload/DropzoneUpload";
// import functional
import { uploadPost } from "../Api";

function UploadPostPage() {
  const [files, setFiles] = useState([]);
  const title = useRef();
  const description = useRef();

  const uploadMutation = useMutation(uploadPost, {
    onSuccess: (res) => {
      console.log(res);
    },
  });

  const handleUpload = (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append("title", title.current.value);
    body.append("description", description.current.value);
    files.forEach((file) => {
      body.append("photos", file);
    });
    uploadMutation.mutate(body);
  };

  return (
    <div className="px-32 flex justify-between mb-16">
      <div className="w-3/5">
        <DropzoneUpload files={files} setFiles={setFiles} />
      </div>
      <div className="w-2/5 px-10">
        <form className="w-full mt-6">
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="py-2 px-4 w-full border-2 border-primary rounded bg-gray-200"
            ref={title}
          />
          <textarea
            placeholder="Description"
            name="description"
            rows="5"
            className="py-2 px-4 w-full border-2 border-primary rounded mt-8 bg-gray-200"
            ref={description}
          />
          <div className="space-x-5 flex justify-center mt-12">
            <button className="min-w-100 bg-gray-300 text-black rounded py-1 font-semibold">
              Cancel
            </button>
            <button
              className="min-w-100 bg-primary text-white rounded py-1 font-semibold"
              onClick={(e) => handleUpload(e)}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadPostPage;
