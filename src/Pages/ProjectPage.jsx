// import modules
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
// import functional
import { getProject, baseURL } from "../Api";

function ProjectPage() {
  const { id } = useParams();
  const { data } = useQuery([`project-${id}`, id], getProject);
  const [image, setImage] = useState(null);
  return (
    <>
      {data && (
        <div className="px-32 flex justify-between mb-20 mt-8">
          <div className="w-1/2 flex flex-col">
            <div className="w-full">
              <img
                src={
                  image === null
                    ? `${baseURL}${data.file[0].fileName}`
                    : `${baseURL}${image}`
                }
                alt="mainImage"
                className="w-full rounded"
              />
            </div>
            <div className="flex flex-row space-x-2 mt-5">
              {data.file.map((file) => {
                return (
                  <img
                    className="w-1/4 object-cover border-2 border-primary rounded opacity-80 hover:opacity-100"
                    src={`${baseURL}${file.fileName}`}
                    alt={file.id}
                    onClick={() => setImage(file.fileName)}
                    key={file.id}
                  />
                );
              })}
            </div>
          </div>
          <div className="w-1/2 pl-10">
            <h3 className="text-lg text-gray-400">{data.description}</h3>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectPage;
