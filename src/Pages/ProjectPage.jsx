// import modules
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
// import components
import Modal from "../Components/Mikro/Modal";
// import functional
import { getProject } from "../Api";

function ProjectPage() {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const { data } = useQuery([`project-${id}`, id], getProject);
  const [image, setImage] = useState(null);
  return (
    <>
      {data && (
        <div className="px-32 flex justify-between mb-20 mt-8">
          <div className="w-1/2 flex flex-col">
            <div className="w-full">
              <img
                src={image === null ? data.file[0].fileName : image}
                alt="mainImage"
                className="w-full rounded"
                onClick={() => setShowModal(true)}
              />
            </div>
            <div className="flex flex-row space-x-2 mt-5">
              {data.file.map((file) => {
                return (
                  <img
                    className="w-1/4 object-cover border-2 border-primary rounded opacity-80 hover:opacity-100"
                    src={file.fileName}
                    alt={file.id}
                    onClick={() => setImage(file.fileName)}
                    key={file.id}
                  />
                );
              })}
            </div>
          </div>
          <div className="w-1/2 pl-10">
            <h3 className="text-lg text-gray-400">{data.description}</h3>
          </div>
        </div>
      )}

      {showModal && (
        <>
          <Modal
            show={showModal}
            close={() => setShowModal(false)}
            shadow={false}
          >
            <div className="flex flex-col justify-center m-4 overflow-auto">
              <img
                src={image === null ? data.file[0].fileName : image}
                className="max-h-3/4 max-w-screen-lg"
                alt="main-project"
              />
              <div className="flex justify-center mt-8">
                <a
                  href={image === null ? data.file[0].fileName : image}
                  download="file-project"
                  className="min-w-100 text-center bg-primary hover:bg-bold text-white rounded py-1 px-2 font-semibold focus:outline-none"
                >
                  Download
                </a>
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
}

export default ProjectPage;
