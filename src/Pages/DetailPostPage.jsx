// import modules
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
// import functional
import { getPostsById } from "../Api";
// import assets
import profile from "../Images/profile.png";
// import Components
import DetailPageLoad from "../Components/Load/DetailPageLoad";
import ButtonFollow from "../Components/Mikro/ButtonFollow";

function DetailPostPage() {
  const { id } = useParams();
  const { data, isLoading } = useQuery([`post-${id}`, id], getPostsById);
  const [mainImage, setMainImage] = useState(data ? data.photo[0].image : null);
  return (
    <>
      {data ? (
        <div className=" sm:px-20 md:px-40 lg:px-80 xl:px-80 mb-16">
          <div className="">
            <div className="flex justify-between">
              <div className="flex flex-row">
                <div>
                  <Link to={`/user/${data.createdby.id}`}>
                    <img
                      src={
                        data.createdby.profile.avatar !== "default"
                          ? data.createdby.profile.avatar
                          : profile
                      }
                      alt="user-post-profile"
                      className="w-16 h-16 rounded-full border-2 border-primary object-cover"
                    />
                  </Link>
                </div>
                <div className="ml-5 my-auto">
                  <h2 className="text-lg font-extrabold">{data.title}</h2>
                  <Link to={`/user/${data.createdby.id}`}>
                    <p className="text-sm">{data.createdby.fullName}</p>
                  </Link>
                </div>
              </div>
              <div className="my-auto space-x-5">
                <ButtonFollow id={data.createdby.id} />
                <Link to={`/hire/${data.createdby.id}`}>
                  <button className="min-w-100 bg-primary text-white rounded py-1 font-semibold">
                    Hire
                  </button>
                </Link>
              </div>
            </div>
            <div className="w-full mt-6">
              <img
                src={mainImage === null ? data.photo[0].image : mainImage}
                alt="main-post"
                className="w-full rounded"
              />
            </div>
            <div className="flex flex-row justify-center space-x-4 mt-3">
              {data.photo.length > 0 &&
                data.photo.map((photo) => {
                  return (
                    <img
                      src={photo.image}
                      key={photo.id}
                      alt={photo.id}
                      className="w-32 h-24 object-cover rounded cursor-pointer border-2 border-primary opacity-80 hover:opacity-100"
                      onClick={() => setMainImage(photo.image)}
                    />
                  );
                })}
            </div>
            <div className="mt-6 text-left">
              <p className="mb-5">
                👋 <span className="font-bold">Say Hello</span>
                {"  "}
                <span className="text-primary">{data.createdby.email}</span>
              </p>
              <p>{data.description}</p>
            </div>
          </div>
        </div>
      ) : isLoading ? (
        <DetailPageLoad />
      ) : null}
    </>
  );
}

export default DetailPostPage;
