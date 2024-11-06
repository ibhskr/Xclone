import {
  FaHome,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaUser,
  FaList,
  FaHashtag,
} from "react-icons/fa";
import { FiBookmark, FiUsers, FiMoreHorizontal } from "react-icons/fi";
import { BsLightningFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);
  // console.log(user);
  return (
    <>
      <div className="sm:flex flex-col items-start w-1/5 h-full p-4 bg-black text-gray-400 hidden ">
        <button className="text-3xl font-bold text-white mb-6 ">X</button>
        <nav className="space-y-4">
          <button
            className="flex items-center space-x-3 text-lg"
            onClick={() => navigate("/")}
          >
            <FaHome className="text-white" />{" "}
            <span className="text-white">Home</span>
          </button>
          <button className="flex items-center space-x-3 text-lg">
            <FaSearch /> <span>Explore</span>
          </button>
          <button className="flex items-center space-x-3 text-lg">
            <FaBell /> <span>Notifications</span>
          </button>
          <button className="flex items-center space-x-3 text-lg">
            <FaEnvelope /> <span>Messages</span>
          </button>
          <button className="flex items-center space-x-3 text-lg">
            <FaHashtag /> <span>Grok</span>
          </button>
          <button className="flex items-center space-x-3 text-lg">
            <FiBookmark /> <span>Bookmarks</span>
          </button>
          <button className="flex items-center space-x-3 text-lg">
            <FiUsers /> <span>Communities</span>
          </button>
          <button className="flex items-center space-x-3 text-lg">
            <BsLightningFill /> <span>Premium</span>
          </button>
          <button
            className="flex items-center space-x-3 text-lg"
            onClick={() => {
              try {
                navigate(`/profile/${user.username}`);
              } catch (error) {
                toast.error("something wrong");
                navigate("/register");
              }
            }}
          >
            <FaUser /> <span>Profile</span>
          </button>
          <button className="flex items-center space-x-3 text-lg">
            <FiMoreHorizontal /> <span>More</span>
          </button>
        </nav>
        <button
          onClick={() => {
            try {
              navigate("/register");
            } catch (error) {
              toast.error("something wrong");
            }
          }}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-full"
        >
          LogOut
        </button>
      </div>
      <div className="flex w-full p-2 justify-between items-center  fixed bottom-0  bg-black sm:hidden">
        <div onClick={() => navigate("/")}>
          <HomeIcon />
        </div>
        <SearchIcon />
        <div onClick={() => navigate("/explore-people")}>
          <PeopleOutlineIcon />
        </div>

        <NotificationsNoneIcon />
        <MailOutlineIcon />
        <div
          onClick={() => {
            try {
              navigate(`/profile/${user.username}`);
            } catch (error) {
              toast.error("something wrong");
              navigate("/register");
            }
          }}
        >
          <PersonOutlineIcon />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
