import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const useUpdateRTK = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateUser = async () => {
    try {
      const res = await axios.get("/api/auth/");
      dispatch(setUser(res.data.user));
      // toast.success("User fetched successfully");
    } catch (error) {
      navigate("/register");
      toast.error("Login expired.");
    }
  };

  return updateUser;
};

export default useUpdateRTK;
