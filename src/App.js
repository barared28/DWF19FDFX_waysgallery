// import modules
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
// import pages
import LandingPage from "./Pages/LandingPage";
import HomePage from "./Pages/HomePage";
import Navbar from "./Components/Navbar";
import DetailPostPage from "./Pages/DetailPostPage";
import ProfilePage from "./Pages/ProfilePage";
import UploadPostPage from "./Pages/UploadPostPage";
import EditProfilePage from "./Pages/EditProfilePage";
import HiredPage from "./Pages/HiredPage";
import SendProjectPage from "./Pages/SendProjectPage";
import MyOrder from "./Pages/MyOrder";
import ProjectPage from "./Pages/ProjectPage";
// import functional
import { reloadApi } from "./Api";
// import Components
import Loader from "./Components/Load/Loader";

function App() {
  const { isSuccess: login, data, isFetching: loading } = useQuery(
    "user",
    reloadApi,
    { refetchOnWindowFocus: false }
  );
  return (
    <>
      <Router>
        <Switch>
          {loading && (
            <div className="flex justify-center h-screen w-screen">
              <Loader />
            </div>
          )}
          {login && data ? (
            <>
              <Navbar />
              <Route exact path="/" component={HomePage} />
              <Route exact path="/post/:id" component={DetailPostPage} />
              <Route exact path="/user/:id" component={ProfilePage} />
              <Route exact path="/my-profile" component={ProfilePage} />
              <Route exact path="/upload-post" component={UploadPostPage} />
              <Route exact path="/edit-profile" component={EditProfilePage} />
              <Route exact path="/hire/:id" component={HiredPage} />
              <Route exact path="/my-order" component={MyOrder} />
              <Route exact path="/project/:id" component={ProjectPage} />
              <Route
                exact
                path="/send-project/:id"
                component={SendProjectPage}
              />
              {/* <ReactQueryDevtools /> */}
            </>
          ) : (
            <>
              <LandingPage />
            </>
          )}
        </Switch>
      </Router>
    </>
  );
}

export default App;
