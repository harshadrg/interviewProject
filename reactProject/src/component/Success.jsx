import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function Success() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/", { replace: true });
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  if (!user) return null;

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-xl text-center ring-1 ring-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">Welcome, {user.username}!</h1>
        <p className="mt-2 text-sm font-semibold text-blue-600 uppercase tracking-widest">
          Account Type: {user.role}
        </p>
        <button
          onClick={handleLogout}
          className="mt-8 w-full cursor-pointer rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 shadow-sm"
        >
          Logout
        </button>
      </div>
    </section>
  );
}