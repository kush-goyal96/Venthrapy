import React from "react";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-background bg-main-page relative overflow-hidden flex items-center justify-center px-4 py-10">
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="w-full max-w-md relative">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-secondary font-semibold text-primary tracking-tight">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-2 text-secondary text-sm">{subtitle}</p>
          ) : null}
        </div>
        <div className="bg-white rounded-2xl shadow-[inset_0_1.5px_1px_rgba(0,0,0,0.08),0_8px_30px_rgba(0,0,0,0.04)] p-6 md:p-8 border border-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
