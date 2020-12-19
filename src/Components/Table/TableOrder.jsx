import React from "react";

function TableOrder({ data }) {
  console.log(data);
  return (
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Vendor</th>
          <th>Order</th>
          <th>Start Project</th>
          <th>End Project</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Bara Borneo</td>
          <td>Buatkan UI UIX</td>
          <td>28 agustus 2020</td>
          <td>28 agustus 2020</td>
          <td>Waiting Approve</td>
          <td>Cancel</td>
        </tr>
      </tbody>
    </table>
  );
}

export default TableOrder;
