// import modules
import { useState, useRef } from "react";
import { useMutation } from "react-query";
import { useParams, useHistory } from "react-router-dom";
// import Components
import DropzoneUpload from "../Components/Upload/DropzoneUpload";
import Modal from "../Components/Mikro/Modal";
// import functional
import { sendProject } from "../Api";

function SendProjectPage() {
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const description = useRef();
  const router = useHistory();
  const uploadMutation = useMutation(sendProject, {
    onSuccess: () => {
      setShowModal(true);
    },
  });
  const handleSend = (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append("description", description.current.value);
    files.forEach((file) => {
      body.append("files", file);
    });
    uploadMutation.mutate({ id, body });
  };
  return (
    <>
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
              ref={description}
            />
            <div className="space-x-5 flex justify-center mt-12">
              <button
                className="min-w-100 bg-primary text-white rounded py-1 px-2 font-semibold"
                onClick={(e) => handleSend(e)}
              >
                Send Project
              </button>
            </div>
          </form>
        </div>
      </div>

      {showModal && (
        <>
          <Modal
            show={showModal}
            close={() => {
              setShowModal(false);
              router.push("/my-order");
            }}
          >
            <div className="flex flex-col justify-center m-10">
              <div className="border-4 w-40 h-40 flex border-green-400 rounded-full">
                <i
                  className="fas fa-check fa-6x text-green-400 mx-auto my-auto"
                  aria-hidden="true"
                ></i>
              </div>
              <h2 className="text-green-400 font-bold text-3xl mt-6">
                Successfully
              </h2>
            </div>
          </Modal>
        </>
      )}
    </>
  );
}

export default SendProjectPage;
