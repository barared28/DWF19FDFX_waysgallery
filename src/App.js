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
// import functional
import { reloadApi } from "./Api";

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
            <>
              <div>Loading</div>
            </>
          )}
          {login && data ? (
            <>
              <Navbar />
              <Route exact path="/" component={HomePage} />
              <Route exact path="/post/:id" component={DetailPostPage} />
              <Route exact path="/user/:id" component={ProfilePage} />
              <Route exact path="/my-profile" component={ProfilePage} />
              <Route exact path="/upload-post" component={UploadPostPage} />
              <ReactQueryDevtools />
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
