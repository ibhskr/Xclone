import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import RightSidebar from "./components/RightSidebar";
import Profile from "./components/Profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register";
import DisplayUsersList from "./components/DisplayUsersList";
import "./App.css";
import FullPost from "./components/FullPost";
import EditProfile from "./components/EditProfile";

const Layout = ({ children }) => (
  <div className="flex flex-col sm:flex-row sm:justify-center w-full">
    <Sidebar />
    <div className=" w-full lg:w-2/5 sm:mx-10 overflow-y-scroll">
      {children}
    </div>
    <div className="hidden lg:block w-1/5">
      <RightSidebar />
    </div>
  </div>
);

function App() {
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: (
        <Layout>
          <Feed />
        </Layout>
      ),
    },
    {
      path: "/profile/:username",
      element: (
        <Layout>
          <Profile />
        </Layout>
      ),
    },
    {
      path: "/profile/:username/edit",
      element: (
        <Layout>
          <EditProfile />
        </Layout>
      ),
    },
    {
      path: "/:username/:query",
      element: (
        <Layout>
          <DisplayUsersList />
        </Layout>
      ),
    },
    {
      path: "/tweet/:tweet_id",
      element: (
        <Layout>
          <FullPost />
        </Layout>
      ),
    },
    {
      path: "/explore-people",
      element: (
        <Layout>
          <RightSidebar />
        </Layout>
      ),
    },
  ]);

  return (
    <div className="flex justify-center h-screen bg-black text-white sm:px-4 ">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
