import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authManager } from "../utils/auth";
import { toast } from "sonner";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Perform login via authManager
      const result = await authManager.login(email, password);
      
      if (result.success) {
        toast.success("Login successful");
        // Redirect to TimeLogger
        navigate("/time-logger");
      } else {
        setError(result.error || "Invalid email or password");
        toast.error("Login failed");
      }
    } catch (err) {
      setError("An error occurred during login");
      console.error(err);
      toast.error("Login error");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinRedirect = () => {
    navigate("/pin");
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-avery-black">
        Staff Login
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-avery-red"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-avery-red"
            required
          />
        </div>

        <div className="flex justify-between space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-1/2 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            disabled={isLoading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-1/2 py-2 bg-avery-red border border-gray-300 rounded-md text-gray-700 hover:bg-red-700 focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={handlePinRedirect}
          className="text-sm text-avery-red hover:underline"
        >
          Use PIN Instead
        </button>
      </div>

      <div className="mt-4 text-center text-sm text-gray-600">
        <p>Demo accounts:</p>
        <p>admin@avery.com / admin123</p>
        <p>staff@avery.com / staff123</p>
        <p className="mt-1">Or use PIN: 1234 (admin) or 5678 (staff)</p>
      </div>
    </div>
  );
};

export default LoginForm;