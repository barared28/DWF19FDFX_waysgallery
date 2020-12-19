import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Modal from "../Mikro/Modal";
import PreviewBox from "../Mikro/PreviewBox";

function DropzoneUpload({
  files = null,
  setFiles,
  preview = true,
  text = "Drag & drop or click to select images",
  onChange = null,
}) {
  const [showAlert, setShowAlert] = useState(false);
  const onDrop = useCallback(
    (acceptedFiles) => {
      files !== null && uploadFileField(acceptedFiles);
      onChange !== null && onChange(acceptedFiles);
    },
    // eslint-disable-next-line
    [files]
  );
  const uploadFileField = (acceptedFiles) => {
    if (files.length < 4 && acceptedFiles.length + files.length < 5) {
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
  };

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
            <p className="text-gray-400 font-bold text-2xl">{text}</p>
          )}
        </div>
      </div>

      {preview && (
        <div className="w-full flex space-x-5 px-5 mt-5">
          <PreviewBox file={files[0]} remove={() => onRemove(0)} />
          <PreviewBox file={files[1]} remove={() => onRemove(1)} />
          <PreviewBox file={files[2]} remove={() => onRemove(2)} />
          <PreviewBox file={files[3]} remove={() => onRemove(3)} />
        </div>
      )}

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

export default DropzoneUpload;
