// import modules
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import Gallery from "react-photo-gallery";
import { useHistory } from "react-router-dom";
// import functional
import { getPosts } from "../Api";
// import Components
import SkeletonBox from "../Components/Load/SkeletonBox";

function HomePage() {
  const cache = useQueryClient();
  const [filter, setFilter] = useState("Latest");
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const { data, isLoading, isFetching, isError } = useQuery(
    ["posts", { search, filter, limit }],
    getPosts,
    {
      refetchOnWindowFocus: false,
      retry: 1,
      retryDelay: 1,
    }
  );
  const router = useHistory();
  const handleClick = (id) => {
    router.push(`post/${id}`);
  };
  return (
    <div>
      <div className="px-32">
        <div className="flex justify-between">
          <div>
            <select
              id="filter"
              className="bg-gray-200 px-3 py-1 rounded focus:outline-none cursor-pointer hover:bg-gray-300"
              onChange={(e) => {
                if (e.target.value === "Followed") {
                  cache.removeQueries("posts");
                }
                setFilter(e.target.value);
              }}
            >
              <option value="Latest" defaultValue>
                Latest
              </option>
              <option value="Followed">Followed</option>
            </select>
          </div>
          <div>
            <div className="relative text-gray-600">
              <input
                type="search"
                name="serch"
                placeholder="Search"
                className="bg-gray-200 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none focus:bg-gray-300"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="absolute right-0 top-0 mt-2 mr-4">
                <i className="fas fa-search"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="font-semibold">
            {search !== "" ? `Results "${search}"` : filter} Post
          </h2>
        </div>
      </div>
      <div className="px-20 my-12">
        {data && data.length > 1 && data !== null ? (
          <>
            <Gallery
              photos={data}
              margin={5}
              onClick={(e) => handleClick(+e.target.alt)}
            />
            <div className="w-full flex mt-10">
              {isFetching ? null : data.length < limit ? (
                <div className="mx-auto px-4 py-2 bg-secondary rounded">
                  <h4 className=" text-white font-semibold">
                    all posts are shown
                  </h4>
                </div>
              ) : (
                <button
                  className="mx-auto bg-secondary px-5 py-2 rounded text-white font-semibold hover:bg-primary"
                  onClick={() => setLimit((prev) => prev + 5)}
                >
                  Load More
                </button>
              )}
            </div>
          </>
        ) : data && data.length === 1 ? (
          <>
            <img
              src={data[0].src}
              alt="posts1"
              className="h-60 cursor-pointer"
              onClick={() => handleClick(data[0].alt)}
            />
          </>
        ) : isLoading ? (
          <SkeletonBox />
        ) : isError ? (
          <h1>Post Not Found</h1>
        ) : null}
      </div>
    </div>
  );
}

export default HomePage;
