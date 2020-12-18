import axios from "axios";

// setting axios
const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});
// setting headers token
const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
// url file base
export const baseURL = "http://localhost:5000/";
//==== Auth ===== //

export const loginApi = (body) => {
  const url = "/login";
  return API.post(url, body).then((res) => {
    const token = res.data.data.token;
    setAuthToken(token);
    localStorage.setItem("token", token);
    return res;
  });
};

export const registerApi = (body) => {
  const url = "/register";
  return API.post(url, body).then((res) => {
    const token = res.data.data.token;
    setAuthToken(token);
    localStorage.setItem("token", token);
    return res;
  });
};

export const reloadApi = (key) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  setAuthToken(token);
  const url = "/verify";
  return API.get(url).then((res) => res.data.data);
};

export const getPosts = () => {
  const url = "/posts";
  return API.get(url).then((res) => {
    return res.data.data.posts.map((post) => {
      const img = new Image();
      img.src = `${baseURL}${post.photo[0].image}`;
      if (!img.width && !img.height) {
        return {
          src: `${baseURL}${post.photo[0].image}`,
          alt: post.id.toString(),
          width: 2,
          height: 2,
        };
      }
      return {
        src: `${baseURL}${post.photo[0].image}`,
        alt: post.id.toString(),
        width: img.width,
        height: img.height,
      };
    });
  });
};

export const getPostsById = ({ queryKey }) => {
  const id = queryKey[1];
  const url = `/post/${id}`;
  return API.get(url).then((res) => res.data.data.post);
};

export const getMyProfile = () => {
  const url = "/user";
  return API.get(url).then((res) => res.data.data);
};

export const getProfileById = ({ queryKey }) => {
  const id = queryKey[1];
  const url = `/user/${id}`;
  return API.get(url).then((res) => res.data.data);
};
