// import modules
import { useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// import components
import DropzoneUpload from "../Components/Upload/DropzoneUpload";
import Modal from "../Components/Mikro/Modal";
// import functional
import { uploadPost } from "../Api";

// scema validation
const postValidation = Yup.object().shape({
  title: Yup.string().min(6, "Too Short !!").required("Title Required"),
  description: Yup.string()
    .min(10, "Too Short !!")
    .required("Description Required"),
});

// main function
function UploadPostPage() {
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const router = useHistory();

  const uploadMutation = useMutation(uploadPost, {
    onSuccess: () => {
      setShowModal(true);
    },
  });

  const handleUpload = (values) => {
    if (!files || files === [] || files.length === 0) {
      alert("Image Post is Required");
      return;
    }
    const body = new FormData();
    body.append("title", values.title);
    body.append("description", values.description);
    files.forEach((file) => {
      body.append("photos", file);
    });
    uploadMutation.mutate(body);
  };

  return (
    <>
      <div className="px-32 flex justify-between mb-16">
        <div className="w-3/5">
          <DropzoneUpload files={files} setFiles={setFiles} />
        </div>
        <div className="w-2/5 px-10">
          <Formik
            initialValues={{ title: "", description: "" }}
            validationSchema={postValidation}
            onSubmit={(values) => handleUpload(values)}
          >
            {({ errors, touched }) => (
              <Form className="w-full mt-6">
                {errors.title && touched.title && (
                  <p className="text-sm text-red-400 font-semibold">
                    {errors.title}
                  </p>
                )}
                <Field
                  name="title"
                  placeholder="Title"
                  className="py-2 px-4 w-full border-2 border-primary rounded bg-gray-200 mb-8"
                />
                {errors.description && touched.description && (
                  <p className="text-sm text-red-400 font-semibold">
                    {errors.description}
                  </p>
                )}
                <Field
                  name="description"
                  as="textarea"
                  rows="6"
                  placeholder="Description"
                  className="py-2 px-4 w-full border-2 border-primary rounded bg-gray-200"
                />
                <div className="space-x-5 flex justify-center mt-12">
                  <button
                    className="min-w-100 bg-gray-300 text-black rounded py-1 font-semibold"
                    onClick={() => router.push("/")}
                  >
                    Cancel
                  </button>
                  <button
                    className="min-w-100 bg-primary text-white rounded py-1 font-semibold"
                    type="submit"
                  >
                    Upload
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {showModal && (
        <>
          <Modal
            show={showModal}
            close={() => {
              setShowModal(false);
              router.push("/");
            }}
            shadow={false}
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

export default UploadPostPage;
