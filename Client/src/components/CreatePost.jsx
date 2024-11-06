import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function CreatePost() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // if (tweet_id === null) {
      let res = await axios.post("/api/tweets", data);
      // } else {
      //   res = await axios.post(`/api/tweets/${tweet_id}/comment`, data);
      // }

      if (res.data.success) {
        toast.success(res.data.message);
        reset();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-b border-gray-700 mb-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register("content", {
            required: true,
            maxLength: {
              value: 280,
              message: " Maximum allowed length is 280.",
            },
          })}
          className="w-full outline-none bg-black text-white border border-gray-600 p-2 rounded resize-none"
          placeholder="What is happening?!"
        />
        {errors.content && (
          <span className="text-red-500 text-xs">
            {errors.content.message || "*This field is required."}
          </span>
        )}
        <div className="flex justify-end my-2">
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-500 text-white py-1 px-4 rounded-full"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
