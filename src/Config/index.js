export const GetSizeImage = (image, callback) => {
  const img = new Image();
  img.src = image;
  img.onload = function () {
    callback(this.width, this.height);
  };
};
