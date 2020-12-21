// import modules
import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { useParams, useHistory } from "react-router-dom";
import { useMutation } from "react-query";
// import assets
import "react-datepicker/dist/react-datepicker.css";
// import functional
import { addHire } from "../Api";

function HiredPage() {
  const { id } = useParams();
  const title = useRef();
  const description = useRef();
  const price = useRef();
  const router = useHistory();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const addHireMutation = useMutation(addHire, {
    onSuccess: (res) => {
      router.push("/my-order");
    },
  });

  const dateJson = (date) => {
    const dateNew = new Date(date);
    const jsonDate = dateNew.toJSON();
    return jsonDate;
  };

  const hadleBidding = () => {
    const body = {
      title: title.current.value,
      description: description.current.value,
      price: price.current.value,
      startDate: dateJson(startDate),
      endDate: dateJson(endDate),
      orderTo: id,
    };
    addHireMutation.mutate(body);
  };

  return (
    <div className="sm:px-20 md:px-40 lg:px-80 xl:px-80 mb-16">
      <form className="space-y-6">
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
          className="py-2 px-4 w-full border-2 border-primary rounded bg-gray-200"
          ref={description}
        />
        <div className="w-full flex justify-between">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={<CustomStart />}
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            customInput={<CustomEnd />}
          />
        </div>
        <input
          type="number"
          placeholder="Price"
          name="price"
          className="py-2 px-4 w-full border-2 border-primary rounded bg-gray-200"
          ref={price}
        />
      </form>
      <div className="flex flex-row space-x-5 justify-center mt-20">
        <button
          className="min-w-100 bg-gray-300 text-black rounded py-1 font-semibold"
          onClick={() => router.push(`/user/${id}`)}
        >
          Cancel
        </button>
        <button
          className="min-w-100 bg-primary text-white rounded py-1 font-semibold"
          onClick={hadleBidding}
        >
          Bidding
        </button>
      </div>
    </div>
  );
}

const CustomStart = ({ value, onClick }) => (
  <div
    className="py-2 px-4 w-64 border-2 border-primary rounded flex justify-between bg-gray-200 cursor-pointer"
    onClick={onClick}
  >
    <p>Start : {value}</p>
    <i
      className="fa fa-calendar self-center fa-lg text-gray-400"
      aria-hidden="true"
    ></i>
  </div>
);

const CustomEnd = ({ value, onClick }) => (
  <div
    className="py-2 px-4 w-64 border-2 border-primary rounded flex justify-between bg-gray-200 cursor-pointer"
    onClick={onClick}
  >
    <p>End : {value}</p>
    <i
      className="fa fa-calendar self-center fa-lg text-gray-400"
      aria-hidden="true"
    ></i>
  </div>
);

export default HiredPage;
