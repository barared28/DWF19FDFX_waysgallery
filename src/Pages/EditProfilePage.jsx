// import modules
import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
// import components
import DropzoneUpload from "../Components/Upload/DropzoneUpload";
import Modal from "../Components/Mikro/Modal";
import PreviewBox from "../Components/Mikro/PreviewBox";
// import functional
import { uploadArt, editProfile } from "../Api";

function EditProfilePage() {
  const [files, setFiles] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const router = useHistory();
  const fullName = useRef();
  const greeting = useRef();
  const avatar = useRef();
  const dataCache = useQueryClient();
  const dataUser = dataCache.getQueryData("user");
  const uploadArtMutation = useMutation(uploadArt, {
    onSuccess: () => {
      setShowAlert(false);
      router.push("/my-profile");
    },
  });
  const editProfileMutation = useMutation(editProfile, {
    onSuccess: (res) => {
      router.push("/my-profile");
    },
  });

  const handleFilesChange = (files) => {
    const fileNew = files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles(fileNew);
    setShowAlert(true);
  };

  const handleUpload = () => {
    const body = new FormData();
    files.forEach((file) => {
      body.append("image", file);
    });
    uploadArtMutation.mutate(body);
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append("avatar", avatar.current.files[0]);
    body.append("fullName", fullName.current.value);
    body.append("greeting", greeting.current.value);
    editProfileMutation.mutate(body);
  };

  return (
    <>
      <div className="px-32 flex justify-between mb-16">
        <div className="w-3/5">
          <DropzoneUpload
            preview={false}
            text="Upload Best Your Art"
            onChange={handleFilesChange}
          />
        </div>
        <div className="w-2/5 px-10">
          <form className="w-full mt-6 flex flex-col">
            <label htmlFor="file" className="cursor-pointer self-center">
              <div className="w-48 h-48 rounded-full border-4 border-dashed hover:border-gray-500 flex justify-center">
                {avatarPreview === null ? (
                  <i
                    className="fa fa-camera my-auto fa-4x  text-gray-400"
                    aria-hidden="true"
                  ></i>
                ) : (
                  <img src={URL.createObjectURL(avatarPreview)} className="w-48 h-48 rounded-full self-center  object-cover" />
                )}
              </div>
              <input
                type="file"
                className="hidden"
                id="file"
                name="photo"
                ref={avatar}
                onChange={(e) => setAvatarPreview(e.target.files[0])}
              />
            </label>

            <input
              type="text"
              placeholder="Greeting"
              name="greeting"
              className="py-2 px-4 w-full border-2 border-primary rounded mt-10 bg-gray-200"
              defaultValue={dataUser && dataUser.profile.greeting}
              ref={greeting}
            />
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              className="py-2 px-4 w-full border-2 border-primary rounded mt-4 bg-gray-200"
              defaultValue={dataUser && dataUser.fullName}
              ref={fullName}
            />

            <div className="space-x-5 flex justify-center mt-12">
              <button
                className="min-w-100 bg-primary hover:bg-bold text-white rounded py-1 font-semibold"
                onClick={(e) => handleEditProfile(e)}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {showAlert && (
        <Modal show={showAlert} close={() => setShowAlert(false)}>
          <div className="max-w-2xl">
            <h2 className="mb-10 mt-5 font-extrabold text-2xl text-primary">
              Are you sure you will upload this ?
            </h2>
            <div className="flex justify-center space-x-3">
              {files.map((file) => (
                <PreviewBox file={file} canRemove={false} key={file.name} />
              ))}
            </div>
            <div className="flex justify-end space-x-5 mt-10 mb-5">
              <button
                className="min-w-100 bg-gray-300 text-black rounded py-1 font-semibold"
                onClick={() => setShowAlert(false)}
              >
                No
              </button>
              <button
                className="min-w-100 bg-primary text-white rounded py-1 font-semibold"
                onClick={handleUpload}
              >
                Yes
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default EditProfilePage;
