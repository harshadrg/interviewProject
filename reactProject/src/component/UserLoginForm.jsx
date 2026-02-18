import axios from "axios";
import { useState } from "react";

export default function UserLoginForm() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [resData, setResData] = useState("");

  const handelChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/loginUser", userData);
      setResData(res.data);
    } catch (error) {
      const err = error.response?.data || "An error occurred";
      setResData(err);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Sign In</h1>
          <p className="text-sm text-slate-500">Enter your details to continue</p>
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
              placeholder="Userrname"
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
            className="mt-2 cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
          >
            Log In
          </button>
        </form>

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