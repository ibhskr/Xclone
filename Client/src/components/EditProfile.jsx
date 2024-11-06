import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import useUpdateRTK from "../hooks/useUpdateRTK"; // Custom hook
import { RiCloseLargeLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const user = useSelector((state) => state.users.user);
  const [updateToggle, setUpdateToggle] = useState(false);
  const [UploadProfilePicPopup, setUploadProfilePicPopup] = useState(false);
  const [UploadCoverPicPopup, setUploadCoverPicPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const updateRTK = useUpdateRTK();
  const navigate = useNavigate();

  useEffect(() => {
    updateRTK();
  }, [updateToggle]);

  const {
    register: newDetails,
    handleSubmit: userDetailsSubmit,
    formState: { errors: newDetailserrors },
  } = useForm();
  const {
    register: newProfilePicture,
    handleSubmit: userProfilePicSubmit,
    formState: { errors: newProfilePicerrors },
  } = useForm();
  const {
    register: newCoverPicture,
    handleSubmit: userCoverPicSubmit,
    formState: { errors: newCoverPicerrors },
  } = useForm();

  // logic for call update user api
  const onSubmitUserDetails = async (data) => {
    console.log(data);

    try {
      setLoading(true);
      const res = await axios.patch("/api/users/update", data);
      // console.log(res);
      if (res.data.success) {
        toast.success("Profile successfully updated");
        setUpdateToggle(!updateToggle);
        navigate(`/profile/${user.username}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  // logic for call update user profile picew api
  const onSubmitProfilePic = async (data) => {
    const formData = new FormData();
    formData.append("myfile", data.myfile[0]); // Append the file to the form data

    try {
      setLoading(true);
      const res = await axios.post("/api/media/profile-picture", formData);
      if (res.data.success) {
        toast.success("Profile picture updated successfully");
        setUpdateToggle(!updateToggle);
        setUploadProfilePicPopup(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload profile picture. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  // logic for call update user cover pic api
  const onSubmitCoverPic = async (data) => {
    const formData = new FormData();
    formData.append("myfile", data.myfile[0]); // Append the file to the form data
    console.log(formData);
    try {
      setLoading(true);
      const res = await axios.post("/api/media/cover-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log(res.data.success);
      if (res.data.success) {
        toast.success("Cover picture updated successfully");
        setUpdateToggle(!updateToggle);
        setUploadCoverPicPopup(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload cover picture. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen text-white bg-gray-900 p-6">
        <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

        <div className="w-full text-sm overflow-y-scroll">
          {/* Banner Section / cover image */}
          <div className="relative flex flex-row mb-4">
            <button
              onClick={() => {
                setUploadProfilePicPopup(false);
                setUploadCoverPicPopup(!UploadCoverPicPopup);
              }}
              className=" w-1/2 border py-4"
            >
              Cover Img.
              <AddAPhotoIcon className="text-gray-400" />
            </button>

            <button
              onClick={() => {
                setUploadCoverPicPopup(false);
                setUploadProfilePicPopup(!UploadProfilePicPopup);
              }}
              className="w-1/2 border py-4"
            >
              Profile Img.
              <AddAPhotoIcon className="text-gray-400" />
            </button>
          </div>

          {/* Form Section */}
          <form
            onSubmit={userDetailsSubmit(onSubmitUserDetails)}
            className=" space-y-3"
          >
            {/* Full Name */}
            <div className="flex flex-col">
              <label>Full Name</label>
              <input
                type="text"
                defaultValue={user?.name}
                className="rounded-lg bg-transparent border border-gray-600 outline-none px-4 py-2"
                {...newDetails("name", { required: "Full Name is required" })}
              />
              {newDetailserrors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {newDetailserrors.name.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div className="flex flex-col">
              <label>Username</label>
              <input
                type="text"
                defaultValue={user?.username}
                className="rounded-lg bg-transparent border border-gray-600 outline-none px-4 py-2"
                {...newDetails("username", {
                  required: "Username is required",
                })}
              />
              {newDetailserrors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {newDetailserrors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label>Email</label>
              <input
                defaultValue={user?.email}
                type="email"
                className="rounded-lg bg-transparent border border-gray-600 outline-none px-4 py-2"
                {...newDetails("email", { required: "Email is required" })}
              />
              {newDetailserrors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {newDetailserrors.email.message}
                </p>
              )}
            </div>

            {/* Bio */}
            <div className="flex flex-col">
              <label>Bio</label>
              <textarea
                defaultValue={user?.bio}
                className="rounded-lg bg-transparent border border-gray-600 outline-none px-4 py-2"
                {...newDetails("bio")}
              ></textarea>
            </div>

            {/* Profession */}
            <div className="flex flex-col">
              <label>Profession</label>
              <input
                type="text"
                defaultValue={user?.profession}
                className="rounded-lg bg-transparent border border-gray-600 outline-none px-4 py-2"
                {...newDetails("profession")}
              />
            </div>

            {/* Location */}
            <div className="flex flex-col">
              <label>Location</label>
              <input
                type="text"
                defaultValue={user?.location}
                className="rounded-lg bg-transparent border border-gray-600 outline-none px-4 py-2"
                {...newDetails("location")}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="rounded-lg bg-blue-700 text-white py-2 px-4 hover:bg-blue-800 transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
      {UploadProfilePicPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-80 transition-opacity ease-in-out duration-300">
          <div className="relative z-50 max-w-md w-full bg-gray-900 border border-gray-700 rounded-xl shadow-xl p-8 space-y-5">
            <div className="flex justify-between items-center">
              <h1 className="text-white text-2xl font-semibold">
                Upload Profile Picture
              </h1>
              <button
                className="text-white hover:text-gray-400 transition-colors ease-in-out duration-300"
                onClick={() => setUploadProfilePicPopup(false)}
                aria-label="Close Upload Modal"
              >
                <RiCloseLargeLine />
              </button>
            </div>
            <form
              className="flex flex-col space-y-4"
              onSubmit={userProfilePicSubmit(onSubmitProfilePic)}
            >
              <input
                type="file"
                className="bg-gray-800 border border-gray-700 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-300"
                {...newProfilePicture("myfile", { required: true })}
              />
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md transition ease-in-out duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                disabled={loading}
                type="submit"
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </form>
          </div>
        </div>
      )}

      {UploadCoverPicPopup && (
        <div className="absolute z-50 top-0 left-1/2 transform -translate-x-1/2 h-fit p-8 space-y-5 bg-gray-900 border border-gray-700 rounded-xl shadow-xl max-w-lg w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-2xl font-semibold">
              Upload Cover Picture
            </h1>
            <button
              className="text-white hover:text-gray-400 transition-colors ease-in-out duration-300"
              onClick={() => setUploadCoverPicPopup(false)}
              aria-label="Close Upload Modal"
            >
              <RiCloseLargeLine />
            </button>
          </div>
          <form
            className="flex flex-col space-y-4"
            onSubmit={userCoverPicSubmit(onSubmitCoverPic)}
          >
            <input
              type="file"
              className="bg-gray-800 border border-gray-700 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-300"
              {...newCoverPicture("myfile", { required: true })}
            />
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md transition ease-in-out duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
              disabled={loading}
              type="submit"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default EditProfile;
