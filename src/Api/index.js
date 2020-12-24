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
export const baseURL = "http://localhost:5000/uploads/";
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

export const getPosts = ({ queryKey }) => {
  const param = queryKey[1];
  const { search, limit = 10, filter } = param;
  const url = filter === "Followed" ? "/posts/followed" : "/posts";
  return API.get(url).then(async (res) => {
    if (res.data.data === {} || !res.data.data) {
      return null;
    }
    const data = res.data.data.posts.filter(
      ({ title }, index) =>
        title.toUpperCase().includes(search.toUpperCase()) && index < limit
    );
    console.log(data);
    return Promise.all(
      data.map(async (post) => {
        const img = new Image();
        if (!post.photo[0].image) {
          return null;
        }
        img.src = `${baseURL}${post.photo[0].image}`;
        await new Promise((resolve, reject) => {
          img.onload = () => {
            resolve();
          };
          setTimeout(() => {
            reject();
          }, 2000);
        });
        return {
          src: `${baseURL}${post.photo[0].image}`,
          alt: post.id.toString(),
          width: img.width,
          height: img.height,
        };
      })
    );
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

export const uploadPost = (body) => {
  const url = "/post";
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return API.post(url, body, config);
};

export const uploadArt = (body) => {
  const url = "/upload-arts";
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return API.post(url, body, config);
};

export const editProfile = (body) => {
  const url = "/user";
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return API.patch(url, body, config);
};

export const addHire = (body) => {
  const url = "/hired";
  return API.post(url, body);
};

export const getMyOrder = () => {
  const url = "/my-order";
  return API.get(url).then((res) => res.data.data.order);
};

export const getMyOffer = () => {
  const url = "/my-offer";
  return API.get(url).then((res) => res.data.data.offer);
};

export const editStatusOrder = ({ id, status }) => {
  const url = `/transaction/${id}`;
  const body = { status };
  return API.patch(url, body);
};

export const sendProject = ({ id, body }) => {
  const url = `/send-project/${id}`;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return API.post(url, body, config);
};

export const getProject = ({ queryKey }) => {
  const id = queryKey[1];
  const url = `/project/${id}`;
  return API.get(url).then((res) => res.data.data.project);
};

export const getStatusFollow = ({ queryKey }) => {
  const id = queryKey[1];
  const url = `/follow/${id}`;
  return API.get(url).then((res) => res.data.data.follow.value);
};

export const editStatusFollow = ({ id, body }) => {
  const url = `/follow/${id}`;
  return API.patch(url, body);
};
