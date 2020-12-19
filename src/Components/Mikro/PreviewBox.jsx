const PreviewBox = ({ file, remove = null, canRemove = true }) => {
  return (
    <>
      {file ? (
        <div className="w-1/4 h-32 border-4 border-dashed hover:border-gray-500">
          {canRemove && (
            <button
              className="absolute ml-3 mt-2 bg-red-400 px-2 rounded-full text-white focus:outline-none hover:bg-red-500"
              onClick={remove}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
          <img
            src={file.preview}
            alt={file.name}
            key={new Date() + file.size}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-1/4 h-32 border-4 border-dashed flex justify-center pb-5">
          <h1 className="text-9xl text-gray-300 self-center">+</h1>
        </div>
      )}
    </>
  );
};

export default PreviewBox;
