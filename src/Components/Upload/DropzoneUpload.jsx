import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Modal from "../Mikro/Modal";

function DropzoneUpload({ files, setFiles }) {
  const [showAlert, setShowAlert] = useState(false);
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (files.length < 4) {
        if (acceptedFiles.length + files.length  < 5) {
          setFiles((prev) => {
            const fileNew = acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            );
            return [...prev, ...fileNew];
          });
        } else {
          setShowAlert(true);
        }
      } else {
        setShowAlert(true);
      }
    },
    [files, setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });
  const onRemove = (index) => {
    setFiles((prev) => {
      return prev.filter((element, i) => {
        return element !== undefined && i !== index;
      });
    });
  };
  return (
    <>
      <div
        {...getRootProps()}
        className={`border-4 py-32 border-dashed flex flex-col justify-center focus:outline-none cursor-pointer hover:border-gray-500 hover:bg-gray-100 ${
          isDragActive && "bg-secondary opacity-40"
        }`}
      >
        <div className="mx-auto">
          <i className="fas fa-cloud-upload-alt text-gray-400 fa-7x"></i>
        </div>
        <div className="text-center px-10">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-white font-bold text-2xl">
              Drop the images here ...
            </p>
          ) : (
            <p className="text-gray-400 font-bold text-2xl">
              Drag & drop or click to select images
            </p>
          )}
        </div>
      </div>
      <div className="w-full flex space-x-5 px-5 mt-5">
        <PreviewBox file={files[0]} remove={() => onRemove(0)} />
        <PreviewBox file={files[1]} remove={() => onRemove(1)} />
        <PreviewBox file={files[2]} remove={() => onRemove(2)} />
        <PreviewBox file={files[3]} remove={() => onRemove(3)} />
      </div>
      {showAlert && (
        <Modal
          show={showAlert}
          close={() => setShowAlert(false)}
          shadow={false}
          popup={true}
        >
          <h1 className="font-bold text-red-500">
            Already Reach Maximum Images
          </h1>
        </Modal>
      )}
    </>
  );
}

const PreviewBox = ({ file, remove }) => {
  return (
    <>
      {file ? (
        <div className="w-1/4 h-32 border-4 border-dashed hover:border-gray-500">
          <button
            className="absolute ml-3 mt-2 bg-red-400 px-2 rounded-full text-white focus:outline-none hover:bg-red-500"
            onClick={remove}
          >
            <i className="fas fa-times"></i>
          </button>
          <img
            src={file.preview}
            alt={file.name}
            key={new Date() + file.size}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-1/4 h-32 border-4 border-dashed flex justify-center pb-5">
          <h1 className="text-9xl text-gray-300 self-center">+</h1>
        </div>
      )}
    </>
  );
};

export default DropzoneUpload;
