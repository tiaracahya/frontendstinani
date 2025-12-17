import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, useDecodeToken } from "../../_services/auth";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("accessToken");
  const decodedData = useDecodeToken(token);

  // ======== Handle input change ========
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ======== Handle form submit ========
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login(formData);

      // Simpan token & user info
      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));

      // Redirect sesuai role
      navigate(response.data.user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ======== Auto redirect jika sudah login ========
  useEffect(() => {
    if (!token || !decodedData) return;

    const now = Math.floor(Date.now() / 1000);

    // Hapus token kalau expired
    if (decodedData.exp && decodedData.exp < now) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");
      return;
    }

    // Redirect sesuai role
    if (decodedData.user?.role) {
      navigate(decodedData.user.role === "admin" ? "/admin" : "/");
    }
  }, [decodedData, navigate, token]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-6 py-8">
      <div className="w-full bg-white rounded-lg shadow-md sm:max-w-md dark:bg-gray-800 dark:border dark:border-gray-700">
        <div className="p-6 space-y-4 sm:p-8">
          <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white text-center">
            SIGN IN TO YOUR ACCOUNT
          </h1>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="name@company.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>
              <label htmlFor="terms" className="ml-3 text-sm font-light text-gray-500 dark:text-gray-300">
                I accept the{" "}
                <a href="#" className="text-indigo-600 hover:underline dark:text-indigo-500">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-lg px-5 py-2.5 text-center disabled:opacity-70"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
            Don’t have an account yet?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline dark:text-indigo-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
