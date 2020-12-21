/* eslint-disable */
export const GetSizeImage = (image, callback) => {
  const img = new Image();
  img.src = image;
  img.onload = function () {
    callback(this.width, this.height);
  };
};

export const convertDate = (data) => {
  const newDate = new Date(data);
  const day = newDate.getDate();
  const monthArr = new Array();
  monthArr[0] = "January";
  monthArr[1] = "February";
  monthArr[2] = "March";
  monthArr[3] = "April";
  monthArr[4] = "May";
  monthArr[5] = "June";
  monthArr[6] = "July";
  monthArr[7] = "August";
  monthArr[8] = "September";
  monthArr[9] = "October";
  monthArr[10] = "November";
  monthArr[11] = "December";
  const month = monthArr[newDate.getMonth()];
  const year = newDate.getUTCFullYear();
  return `${day} ${month} ${year}`;
};

export const formatingCurency = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(+number);
};
