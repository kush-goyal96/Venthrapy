import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import reactLogo from "../assets/react.svg";

const posts = Array.from({ length: 6 }).map((_, i) => ({
  title: "Why Journaling works (and how to start it)",
  excerpt: "Someone flipping through a pretty notebook, soft lo-fi music",
  author: "Gurleen Kaur",
  date: "Aug 16, 2025",
  readTime: "12min read",
  image: reactLogo,
  link: "#",
  id: i,
}));

const Blogs = () => {
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
          {posts.map((p) => (
            <BlogCard key={p.id} {...p} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
