import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout.jsx";
import AuthInput from "../components/auth/AuthInput.jsx";
import AuthButton from "../components/auth/AuthButton.jsx";
import { signup } from "../lib/api.js";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signup(form);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      let errorMsg = "Signup failed";

      if (err.response?.data?.error) {
        const error = err.response.data.error;
        if (typeof error === "string") {
          errorMsg = error;
        } else if (error.fieldErrors) {
          // Handle Zod field errors - show the first meaningful error
          const fieldErrors = Object.values(error.fieldErrors).flat();
          if (fieldErrors.length > 0) {
            // Show a cleaner message for password validation
            if (fieldErrors[0].includes("Must include")) {
              errorMsg =
                "Password must be at least 8 characters with uppercase, lowercase, number, and special character";
            } else {
              errorMsg = fieldErrors[0];
            }
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
    <AuthLayout
      title="Create your account"
      subtitle="Join Venthrapy to get started"
    >
      <form onSubmit={onSubmit}>
        <AuthInput
          label="Name"
          name="name"
          type="text"
          value={form.name}
          onChange={onChange}
          placeholder="Your full name"
          autoComplete="name"
        />
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
          placeholder="Create a strong password"
          autoComplete="new-password"
        />
        <div className="text-sm text-secondary mb-5">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Log in
          </Link>
        </div>
        <AuthButton type="submit" loading={loading}>
          Create account
        </AuthButton>
      </form>
    </AuthLayout>
  );
};

export default Signup;
