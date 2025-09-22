import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IoArrowBack } from "react-icons/io5";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchBlogById } from "../lib/api";
import toast from "react-hot-toast";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const initialFromList = () => {
    const list = queryClient.getQueryData(["blogs"]) || [];
    return list.find((b) => String(b.id) === String(id));
  };

  const {
    data: blog,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id),
    initialData: initialFromList,
    retry: 1,
  });

  if (isError) toast.error("Failed to load blog");

  if (isLoading && !blog) {
    return (
      <div className="bg-main-page min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-10 text-secondary">
          Loading...
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="bg-main-page min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-primary mb-4">
            Blog not found
          </h1>
          <button
            onClick={() => navigate("/blogs")}
            className="bg-primary text-white px-6 py-2 rounded-lg cursor-pointer"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-main-page">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <button
          onClick={() => navigate("/blogs")}
          className="flex items-center text-primary hover:text-primary/80 transition-colors mb-6 cursor-pointer"
        >
          <IoArrowBack className="w-5 h-5 mr-2" />
          Back to Blogs
        </button>

        <h1 className="text-4xl font-secondary font-semibold text-primary mb-4">
          {blog.title}
        </h1>
        <div className="text-secondary mb-6">
          <span>{blog.author}</span>
          <span className="mx-2">·</span>
          <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
          {blog.readTime && (
            <>
              <span className="mx-2">·</span>
              <span>{blog.readTime}</span>
            </>
          )}
        </div>

        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full rounded-2xl mb-8 object-cover"
          />
        )}

        <div className="prose max-w-none text-secondary">{blog.content}</div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetail;
