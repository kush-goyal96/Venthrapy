import React from "react";

const AuthButton = ({
  children,
  type = "button",
  onClick,
  loading = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="w-full bg-primary hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl px-4 py-3 text-sm font-medium transition-colors"
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default AuthButton;
