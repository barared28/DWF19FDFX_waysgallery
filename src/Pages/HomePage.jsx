// import modules
import { useQuery } from "react-query";
import Gallery from "react-photo-gallery";
import { useHistory } from "react-router-dom";
// import functional
import { getPosts } from "../Api";

function HomePage() {
  const { data } = useQuery("posts", getPosts, { refetchOnWindowFocus: false });
  const router = useHistory();
  const handleClick = (id) => {
    router.push(`post/${id}`);
  };
  return (
    <div>
      <div className="px-32">
        <div className="flex justify-between">
          <div>
            <select id="filter" className="bg-gray-200 px-3 py-1 rounded focus:outline-none cursor-pointer hover:bg-gray-300">
              <option value="today" defaultValue>
                Today
              </option>
              <option value="yesterday">Yesterday</option>
              <option value="latest">Latest</option>
              <option value="Trend">Trend</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              name="find"
              placeholder="Search"
              className="bg-gray-300 rounded px-4 py-1"
            />
          </div>
        </div>
        <div className="mt-10">
          <h2 className="font-semibold">Today Post</h2>
        </div>
      </div>
      <div className="px-20 my-12">
        {data && data.length > 0 && (
          <Gallery
            photos={data}
            margin={5}
            onClick={(e) => handleClick(+e.target.alt)}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
