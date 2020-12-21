// import modules
import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
// import functional
import { getStatusFollow, editStatusFollow } from "../../Api";

function ButtonFollow({ id }) {
  const cache = useQueryClient();
  const { data } = useQuery([`follow-${id}`, id], getStatusFollow);
  const followMutation = useMutation(editStatusFollow, {
    onSuccess: () => {
      cache.invalidateQueries(`follow-${id}`);
    },
  });
  const handleFollow = (status) => {
    const body = { value: status };
    followMutation.mutate({ id, body });
  };
  return (
    <>
      {data ? (
        <button
          className="min-w-100 bg-red-400 hover:bg-red-500 text-white rounded py-1 font-semibold focus:outline-none"
          onClick={() => handleFollow(false)}
        >
          Unfollow
        </button>
      ) : (
        <button
          className="min-w-100 bg-gray-300 hover:bg-gray-400 text-black rounded py-1 font-semibold focus:outline-none"
          onClick={() => handleFollow(true)}
        >
          Follow
        </button>
      )}
    </>
  );
}

export default ButtonFollow;
