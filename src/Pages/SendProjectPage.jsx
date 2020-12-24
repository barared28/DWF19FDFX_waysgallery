// import modules
import { useState } from "react";
import { useMutation } from "react-query";
import { useParams, useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// import Components
import DropzoneUpload from "../Components/Upload/DropzoneUpload";
import Modal from "../Components/Mikro/Modal";
import UploadLoader from "../Components/Load/UploadLoader";
// import functional
import { sendProject } from "../Api";

// scema validation
const projectValidation = Yup.object().shape({
  description: Yup.string()
    .min(10, "Too Short !!")
    .required("Description Required"),
});

// main function
function SendProjectPage() {
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const router = useHistory();
  const uploadMutation = useMutation(sendProject, {
    onSuccess: () => {
      setLoader(false);
      setShowModal(true);
    },
  });
  const handleSend = (values) => {
    if (!files || files === [] || files.length === 0) {
      alert("Image Project is Required");
      return;
    }
    const body = new FormData();
    body.append("description", values.description);
    files.forEach((file) => {
      body.append("images", file);
    });
    setLoader(true);
    uploadMutation.mutate({ id, body });
  };
  return (
    <>
      <div className="px-32 flex justify-between mb-16">
        <div className="w-3/5">
          <DropzoneUpload files={files} setFiles={setFiles} />
        </div>
        <div className="w-2/5 px-10">
          <Formik
            initialValues={{ description: "" }}
            validationSchema={projectValidation}
            onSubmit={(values) => handleSend(values)}
          >
            {({ errors, touched }) => (
              <Form className="w-full">
                {errors.description && touched.description && (
                  <p className="text-sm text-red-400 font-semibold">
                    {errors.description}
                  </p>
                )}
                <Field
                  name="description"
                  as="textarea"
                  rows="5"
                  placeholder="Description"
                  className="py-2 px-4 w-full border-2 border-primary rounded"
                />
                <div className="space-x-5 flex justify-center mt-12">
                  <button
                    className="min-w-100 bg-primary hover:bg-bold text-white rounded py-1 px-2 font-semibold"
                    type="submit"
                  >
                    Send Project
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
      {loader && <UploadLoader />}
    </>
  );
}

export default SendProjectPage;
