import React from "react";
import PropTypes from "prop-types";

const BlogCard = ({ title, excerpt, author, date, readTime, image, link }) => {
  return (
    <a
      href={link || "#"}
      className="group bg-white rounded-2xl border border-gray-200 shadow-sm w-[300px] flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/40"
    >
      <div className="p-4 pb-2">
        <div className="rounded-xl overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-36 object-cover bg-blue-500/70 group-hover:scale-[1.02] transition-transform duration-200"
          />
        </div>
      </div>
      <div className="px-4 pt-2 pb-4 space-y-2">
        <h3 className="text-base font-semibold leading-snug text-primary font-inter-tight group-hover:underline">
          {title}
        </h3>
        <p className="text-xs text-gray-600 leading-snug line-clamp-2 font-inter-tight font-medium">
          {excerpt}
        </p>
        <div className="text-sm text-gray-500 font-inter-tight ">
          <div>{author}</div>
          <div className="flex items-center gap-2">
            <span>{date}</span>
            <span>·</span>
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

BlogCard.propTypes = {
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  readTime: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string,
};

export default BlogCard;
