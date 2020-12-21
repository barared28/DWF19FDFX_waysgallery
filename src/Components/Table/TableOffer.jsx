// import modules
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
// import functional
import { convertDate } from "../../Config";
import { editStatusOrder } from "../../Api";
import { formatingCurency } from "../../Config";
// import Components
import Modal from "../Mikro/Modal";

function TableOffer({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [ContentModal, setContentModal] = useState();
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Client</th>
            <th>Order</th>
            <th>Start Project</th>
            <th>End Project</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((order, index) => (
              <Content
                data={order}
                key={index}
                index={index}
                setShow={setShowModal}
                setContent={setContentModal}
              />
            ))}
        </tbody>
      </table>

      {showModal && (
        <>
          <Modal show={showModal} close={() => setShowModal(false)}>
            {ContentModal}
          </Modal>
        </>
      )}
    </>
  );
}

const Content = ({ data, index, setShow, setContent }) => {
  const cache = useQueryClient();
  const editMutation = useMutation(editStatusOrder, {
    onSuccess: () => {
      cache.invalidateQueries("my-offer");
    },
  });
  const contentModal = () => {
    return (
      <div className="w-96">
        <h2 className="text-2xl text-gray-400">{data.title}</h2>
        <h3 className="text-xl text-gray-400 mt-5">{data.description}</h3>
        <h4 className="text-xl text-green-400 mt-5">
          Price : {formatingCurency(data.price)}
        </h4>
        {data.status === "Waiting Approve" && (
          <div className="flex justify-end space-x-4 mt-5">
            <button
              className="bg-red-400 hover:bg-red-500 px-2 py-1 rounded text-white font-semibold"
              onClick={() => {
                handleEdit("Cancel");
                setShow(false);
              }}
            >
              Cancel
            </button>
            <button
              className="bg-green-400 hover:bg-green-500 px-2 py-1 rounded text-white font-semibold"
              onClick={() => {
                handleEdit("On Progress");
                setShow(false);
              }}
            >
              Approve
            </button>
          </div>
        )}
      </div>
    );
  };

  const handleEdit = (status) => {
    editMutation.mutate({ id: data.id, status });
  };

  const handleModal = () => {
    setContent(contentModal);
    setShow(true);
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{data.seller.fullName}</td>
      <td onClick={handleModal} className="text-blue-400 cursor-pointer">
        {data.title}
      </td>
      <td>{convertDate(data.startDate)}</td>
      <td>{convertDate(data.endDate)}</td>
      <td
        className={
          data.status === "Waiting Approve"
            ? "text-yellow-400"
            : data.status === "On Progress"
            ? "text-blue-400"
            : data.status === "Completed"
            ? "text-green-400"
            : data.status === "Project Finish"
            ? "text-green-400"
            : "text-red-400"
        }
      >
        {data.status}
      </td>
      <td>
        {data.status === "Waiting Approve" ? (
          <div className="flex justify-center space-x-3">
            <button
              className="bg-red-400 hover:bg-red-500 px-2 py-1 rounded text-white font-semibold"
              onClick={() => handleEdit("Cancel")}
            >
              Cancel
            </button>
            <button
              className="bg-green-400 hover:bg-green-500 px-2 py-1 rounded text-white font-semibold"
              onClick={() => handleEdit("On Progress")}
            >
              Approve
            </button>
          </div>
        ) : data.status === "On Progress" || data.status === "Rejected" ? (
          <div className="flex justify-center">
            <Link to={`/send-project/${data.id}`}>
              <button className="bg-blue-400 hover:bg-blue-500 px-2 py-1 rounded text-white font-semibold">
                Send Project
              </button>
            </Link>
          </div>
        ) : data.status === "Completed" ? (
          <div className="flex justify-center">
            <div className="w-6 h-6 bg-green-400 px-1 rounded-full flex justify-center">
              <i
                className="fas fa-check fa-xs text-white my-auto"
                aria-hidden="true"
              ></i>
            </div>
          </div>
        ) : data.status === "Project Finish" ? (
          <div className="flex justify-center">
            <div className="w-6 h-6 bg-green-400 px-1 rounded-full flex justify-center">
              <i
                className="fa fa-hourglass fa-xs text-white my-auto"
                aria-hidden="true"
              ></i>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-6 h-6 bg-red-400 px-1 rounded-full flex justify-center">
              <i className="fas fa-times status-cancel fa-xs text-white my-auto"></i>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

export default TableOffer;
