// import modules
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// import components
import DropzoneUpload from "../Components/Upload/DropzoneUpload";
import Modal from "../Components/Mikro/Modal";
import PreviewBox from "../Components/Mikro/PreviewBox";
import UploadLoader from "../Components/Load/UploadLoader";
// import functional
import { uploadArt, editProfile } from "../Api";

// scema validation
const profileValidation = Yup.object().shape({
  fullName: Yup.string().min(4, "Too Short !!").required("Full Name Required"),
  greeting: Yup.string()
    .min(4, "Too Short !!")
    .max(20, "Too Long !!")
    .required("Greeting Required"),
});

// main function
function EditProfilePage() {
  const [files, setFiles] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [loader, setLoader] = useState(false);
  const router = useHistory();
  const dataCache = useQueryClient();
  const dataUser = dataCache.getQueryData("user");
  const uploadArtMutation = useMutation(uploadArt, {
    onSuccess: () => {
      setLoader(false);
      setShowAlert(false);
      router.push("/my-profile");
    },
  });
  const editProfileMutation = useMutation(editProfile, {
    onSuccess: () => {
      setLoader(false);
      router.push("/my-profile");
      dataCache.invalidateQueries("user");
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
      body.append("images", file);
    });
    setLoader(true);
    uploadArtMutation.mutate(body);
  };

  const handleEditProfile = (values) => {
    if (!avatar || avatar === null) {
      alert("Avatar is Required");
      return;
    }
    const body = new FormData();
    body.append("images", avatar);
    body.append("fullName", values.fullName);
    body.append("greeting", values.greeting);
    setLoader(true);
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
          <div className="w-full mt-6 flex flex-col">
            <input
              name="avatar"
              type="file"
              id="avatar"
              className="hidden"
              onChange={(e) => setAvatar(e.target.files[0])}
            />

            {avatar === null || !avatar ? (
              <label
                className="w-48 h-48 self-center mb-10 rounded-full border-4 border-dashed hover:border-gray-500 flex justify-center cursor-pointer"
                htmlFor="avatar"
              >
                <i
                  className="fa fa-camera my-auto fa-4x  text-gray-400"
                  aria-hidden="true"
                ></i>
              </label>
            ) : (
              <label htmlFor="avatar" className="self-center mb-10">
                <img
                  src={URL.createObjectURL(avatar)}
                  className="w-48 h-48 rounded-full shadow-2xl object-cover cursor-pointer"
                  alt="preview-profile"
                />
              </label>
            )}
          </div>

          <Formik
            initialValues={{
              fullName: dataUser.fullName,
              greeting: dataUser.profile.greeting,
            }}
            validationSchema={profileValidation}
            onSubmit={(values) => handleEditProfile(values)}
          >
            {({ errors, touched }) => (
              <Form className="w-full mt-6 flex flex-col">
                {errors.greeting && touched.greeting && (
                  <p className="text-sm text-red-400 font-semibold">
                    {errors.greeting}
                  </p>
                )}
                <Field
                  name="greeting"
                  className="py-2 px-4 w-full border-2 border-primary rounded bg-gray-200 mb-4"
                  placeholder="Greeting"
                />
                {errors.fullName && touched.fullName && (
                  <p className="text-sm text-red-400 font-semibold">
                    {errors.fullName}
                  </p>
                )}
                <Field
                  name="fullName"
                  className="py-2 px-4 w-full border-2 border-primary rounded bg-gray-200"
                  placeholder="Full Name"
                />
                <div className="space-x-5 flex justify-center mt-12">
                  <button
                    className="min-w-100 bg-primary hover:bg-bold text-white rounded py-1 font-semibold"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
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
      {loader && <UploadLoader />}
    </>
  );
}

export default EditProfilePage;
