import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ fullName, email, subscribed });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Left Side: Background Image */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-6 h-80 lg:h-screen">
        <img
          src="https://cdn.pixabay.com/photo/2013/07/13/12/43/girl-160173_1280.png"
          alt="Login Illustration"
          className="object-contain w-60 lg:w-150"
        />
      </div>

      {/* Right Side: Udemy-Style Signup Form */}
      <div className="lg:w-1/2 w-full flex items-center justify-center p-6 sm:p-8 md:p-12">
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "#fff",
            padding: "48px 40px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
        >
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "700",
              marginBottom: "30px",
              color: "#1c1d1f",
              textAlign: "left",
            }}
          >
            Sign up with email
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div style={{ marginBottom: "16px" }}>
              <input
                type="text"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: "16px",
                  border: "1px solid #d1d7dc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                  outline: "none",
                  transition: "border-color 0.2s",
                  fontFamily: "inherit",
                }}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: "16px" }}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: "16px",
                  border: "1px solid #d1d7dc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                  outline: "none",
                  transition: "border-color 0.2s",
                  fontFamily: "inherit",
                }}
              />
            </div>

            {/* Checkbox */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: "24px",
                gap: "8px",
              }}
            >
              <input
                type="checkbox"
                id="subscribe"
                checked={subscribed}
                onChange={(e) => setSubscribed(e.target.checked)}
                style={{
                  width: "18px",
                  height: "18px",
                  marginTop: "2px",
                  cursor: "pointer",
                  accentColor: "#5624d0",
                  flexShrink: 0,
                }}
              />
              <label
                htmlFor="subscribe"
                style={{
                  fontSize: "14px",
                  color: "#1c1d1f",
                  lineHeight: "1.4",
                  cursor: "pointer",
                }}
              >
                Send me special offers, personalized recommendations, and
                learning tips.
              </label>
            </div>

            {/* Continue Button */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                fontSize: "16px",
                fontWeight: "700",
                color: "#fff",
                backgroundColor: "#5624d0",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background-color 0.2s",
                fontFamily: "inherit",
              }}
            >
              Continue
            </button>

            {/* Divider */}
            <div
              style={{
                position: "relative",
                textAlign: "center",
                margin: "24px 0",
                borderTop: "1px solid #d1d7dc",
              }}
            >
              <span
                style={{
                  backgroundColor: "#fff",
                  padding: "0 12px",
                  fontSize: "14px",
                  color: "#6a6f73",
                  position: "relative",
                  top: "-11px",
                }}
              >
                Other sign up options
              </span>
            </div>

            {/* Social Buttons */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginBottom: "24px",
                justifyContent: "center",
              }}
            >
              <button
                style={{
                  width: "50px",
                  height: "50px",
                  border: "1px solid #d1d7dc",
                  borderRadius: "4px",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  style={{ width: "24px", height: "24px" }}
                />
              </button>

              <button
                style={{
                  width: "50px",
                  height: "50px",
                  border: "1px solid #d1d7dc",
                  borderRadius: "4px",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://www.svgrepo.com/show/452196/facebook-1.svg"
                  alt="Facebook"
                  style={{ width: "24px", height: "24px" }}
                />
              </button>

              <button
                style={{
                  width: "50px",
                  height: "50px",
                  border: "1px solid #d1d7dc",
                  borderRadius: "4px",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://www.svgrepo.com/show/511330/apple-173.svg"
                  alt="Apple"
                  style={{ width: "24px", height: "24px" }}
                />
              </button>
            </div>

            {/* Terms */}
            <p
              style={{
                fontSize: "12px",
                color: "#6a6f73",
                textAlign: "center",
                marginBottom: "16px",
                lineHeight: "1.5",
              }}
            >
              By signing up, you agree to our{" "}
              <a
                href="#"
                style={{ color: "#5624d0", textDecoration: "underline" }}
              >
                Terms of Use
              </a>{" "}
              and{" "}
              <a
                href="#"
                style={{ color: "#5624d0", textDecoration: "underline" }}
              >
                Privacy Policy
              </a>
              .
            </p>

            {/* Login Link */}
            <p
              style={{
                fontSize: "14px",
                color: "#6a6f73",
                textAlign: "center",
              }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#5624d0",
                  fontWeight: "700",
                  textDecoration: "underline",
                }}
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
