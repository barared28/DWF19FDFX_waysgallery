// import modules
import { useState } from "react";
import { useQuery } from "react-query";
// import components
import TableOrder from "../Components/Table/TableOrder";
import TableOffer from "../Components/Table/TableOffer";
import Loader from "../Components/Load/Loader";
// import functional
import { getMyOrder, getMyOffer } from "../Api";

function MyOrder() {
  const [table, setTable] = useState("order");
  const { data: orderData, isLoading: loadingOrder } = useQuery(
    "my-order",
    getMyOrder
  );
  const { data: offerData, isLoading: loadingOffer } = useQuery(
    "my-offer",
    getMyOffer
  );
  return (
    <>
      <div className="px-32">
        <div>
          <select
            id="filter"
            className="bg-gray-200 px-3 py-1 rounded focus:outline-none cursor-pointer hover:bg-gray-300"
            onChange={(e) => setTable(e.target.value)}
          >
            <option value="order" defaultValue>
              My Order
            </option>
            <option value="offer">My Offer</option>
          </select>
        </div>
        <div className="mt-16">
          {table === "order" && orderData && <TableOrder data={orderData}/>}
          {table === "offer" && offerData && <TableOffer data={offerData} />}
          {loadingOrder && loadingOffer && (
            <div className="flex justify-center">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyOrder;
