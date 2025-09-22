import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../lib/api";
import toast from "react-hot-toast";

const Blogs = () => {
  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    staleTime: 60000,
    retry: 1,
  });
  if (isError) toast.error("Failed to load blogs");

  return (
    <div className="bg-main-page">
      <Navbar />
      <div className="items-center justify-center w-full my-10">
        <div>
          <h1 className="font-secondary text-primary font-semibold text-center text-5xl italic pb-5">
            Blogs
          </h1>
        </div>
        <div className="max-w-6xl mx-auto mt-5 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          {isLoading && (
            <div className="col-span-full text-secondary">Loading blogs...</div>
          )}
          {!isLoading &&
            posts.map((p) => (
              <BlogCard
                key={p.id}
                title={p.title}
                excerpt={p.excerpt}
                author={p.author}
                date={new Date(p.publishedAt).toLocaleDateString()}
                readTime={p.readTime || ""}
                image={p.coverImage}
                link={`/blogs/${p.id}`}
              />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
