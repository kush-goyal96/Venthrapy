import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout.jsx";
import AuthInput from "../components/auth/AuthInput.jsx";
import AuthButton from "../components/auth/AuthButton.jsx";
import { login } from "../lib/api.js";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(form);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (err) {
      let errorMsg = "Login failed";

      if (err.response?.data?.error) {
        const error = err.response.data.error;
        if (typeof error === "string") {
          errorMsg = error;
        } else if (error.fieldErrors) {
          // Handle Zod field errors - show the first meaningful error
          const fieldErrors = Object.values(error.fieldErrors).flat();
          if (fieldErrors.length > 0) {
            errorMsg = fieldErrors[0];
          }
        } else if (error.formErrors) {
          errorMsg = error.formErrors[0] || "Please check your input";
        }
      }

      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to continue your journey">
      <form onSubmit={onSubmit}>
        <AuthInput
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <AuthInput
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          placeholder="••••••••"
          autoComplete="current-password"
        />
        <div className="flex items-center justify-between mb-5 text-sm">
          <div className="text-secondary">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary">
              Sign up
            </Link>
          </div>
          <Link to="#" className="text-primary">
            Forgot password?
          </Link>
        </div>
        <AuthButton type="submit" loading={loading}>
          Log in
        </AuthButton>
      </form>
    </AuthLayout>
  );
};

export default Login;
