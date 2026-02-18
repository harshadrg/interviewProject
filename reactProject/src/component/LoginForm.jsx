import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const navigate = useNavigate();
  // New state to toggle between 'user' and 'admin'
  const [isAdmin, setIsAdmin] = useState(false);

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [resData, setResData] = useState("");

  // BLOCK LOGIN IF ALREADY LOGGED IN
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      navigate("/success", { replace: true });
    }
  }, [navigate]);

  const handelChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    // Dynamically choose endpoint based on isAdmin state
    const endpoint = isAdmin ? "/admin-login" : "/user-login";

    try {
      const res = await axios.post(`http://localhost:5000${endpoint}`, userData);
      if (res.data.success) {
        // Store session
        localStorage.setItem("user", JSON.stringify({
          username: userData.username,
          role: isAdmin ? "admin" : "user",
          isLoggedIn: true
        }));
        // Navigate to success page
        navigate("/success");
      } else {
        setResData(res.data);
      }
    } catch (error) {
      const err = error.response?.data || "An error occurred";
      setResData(err);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-xl ring-1 ring-slate-200 transition-all">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {isAdmin ? "Admin Portal" : "Sign In"}
          </h1>
          <p className="text-sm text-slate-500">
            {isAdmin ? "Management Access Only" : "Enter your details to continue"}
          </p>
        </header>

        <form onSubmit={handelSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-sm font-semibold text-slate-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={userData.username}
              onChange={handelChange}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="Username"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-semibold text-slate-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={userData.password}
              onChange={handelChange}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            className={`mt-2 cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-sm transition active:scale-95 ${isAdmin ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {isAdmin ? "Admin Login" : "Log In"}
          </button>
        </form>

        {/* --- TOGGLE BUTTON SECTION --- */}
        <div className="mt-6 border-t border-slate-100 pt-6 text-center">
          <p className="text-xs text-slate-400 mb-3">Switch account type</p>
          <button
            onClick={() => {
              setIsAdmin(!isAdmin);
              setResData(""); // Clear old response when switching
            }}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition underline decoration-2 underline-offset-4"
          >
            {isAdmin ? "Back to User Login" : "Login as Administrator"}
          </button>
        </div>

        {resData && (
          <div className="mt-6 overflow-hidden rounded-md bg-slate-900 p-4">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Server Response</p>
            <pre className="overflow-x-auto text-xs text-blue-300">
              {JSON.stringify(resData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}