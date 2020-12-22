// import modules
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
// import functional
import { getMyProfile, baseURL, getProfileById } from "../Api";
// import assets
import profileImage from "../Images/profile.png";
// import Components
import Loader from "../Components/Load/Loader";
import ButtonFollow from "../Components/Mikro/ButtonFollow";

function ProfilePage() {
  const { id } = useParams();
  const { data, isLoading } = useQuery(
    id ? [`user-${id}`, id] : "myProfile",
    id ? getProfileById : getMyProfile
  );
  return (
    <>
      {data ? (
        <div className="px-32 mb-16">
          <div className="flex justify-between">
            <div className="flex flex-col mt-10">
              <div>
                <img
                  src={
                    data.profile.avatar === "default"
                      ? profileImage
                      : `${baseURL}${data.profile.avatar}`
                  }
                  alt="profile"
                  className="w-32 h-32 rounded-full border-2 border-primary object-cover"
                />
              </div>
              <h4 className="text-2xl font-extrabold mt-6">{data.fullName}</h4>
              <h2 className="text-5xl font-extrabold mt-4">
                {data.profile.greeting}
              </h2>
              <div className="mt-12">
                {id ? (
                  <div className="flex flex-row space-x-5">
                    <ButtonFollow id={id} />
                    <Link to={`/hire/${data.id}`}>
                      <button className="min-w-100 bg-primary text-white rounded py-1 font-semibold">
                        Hire
                      </button>
                    </Link>
                  </div>
                ) : (
                  <Link to="/edit-profile">
                    <button className="px-5 bg-primary hover:bg-bold text-white rounded py-1 font-semibold">
                      Edit Profile
                    </button>
                  </Link>
                )}
              </div>
            </div>
            <div className="pr-24 mt-4 w-2/4 flex justify-end">
              {data.post.length === 0 ? (
                <div className="bg-gray-600 w-full h-96 rounded opacity-30 flex justify-center">
                  <div className="self-center">
                    <h4 className="text-4xl">Not Have Post</h4>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-full z-20">
                    <Link to={`/post/${data.post[0].id}`}>
                      <img
                        src={`${baseURL}${data.post[0].photo[0].image}`}
                        className="w-full rounded"
                        alt="post-user"
                      />
                    </Link>
                  </div>
                  <div className="absolute bg-primary w-96 h-96 top-28 right-0 z-0"></div>
                </>
              )}
            </div>
          </div>
          <div className="mt-16">
            <h3 className="text-lg font-bold">
              {id ? `${data.fullName} Works` : "My Works"}
            </h3>
            <div className="mt-10 w-full">
              {data.art.length === 0 ? (
                <div className="w-1/3 h-64 bg-gray-600 rounded opacity-30 flex justify-center">
                  <div className="self-center">
                    <h4 className="text-4xl">Not Have Art</h4>
                  </div>
                </div>
              ) : (
                <div className="grid grid-flow-col gap-4">
                  {data.art.map((art) => {
                    return (
                      <div>
                        <img src={`${baseURL}${art.image}`} alt={art.id} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center h-screen w-screen">
          <Loader />
        </div>
      ) : null}
    </>
  );
}

export default ProfilePage;
