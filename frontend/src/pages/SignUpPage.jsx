import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  let confirmPassword = "";

  const { isSignUp, signUp } = useAuthStore();
  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return toast.error("Tên không được để trống ");
    }
    if (!formData.email.trim()) {
      return toast.error("Email không được để trống ");
    }
    if (!formData.password.trim()) {
      return toast.error("Password không được để trống ");
    }
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(formData.email)) {
      return toast.error("Email khong dung dinh dang");
    }
    if (formData.password.length < 6) {
      return toast.error("Password khong the duoi 6 ky tu");
    }
    if (confirmPassword !== formData.password) {
      return toast.error("Mat khau khong trung khop");
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      signUp(formData);
    }
  };

  //design giao dien in here
  return (
    <div className="min-h-screen grid lg:grid-cols-2 ">
      {/*phan ben trai */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 ">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors ">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                {" "}
                Get started with your free account
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <fieldset className="fieldset mb-0.5">
              <legend className="fieldset-legend text-left ml-3 italic ">
                FullName
              </legend>
              <label className="input validator input-bordered w-full pl-3 border-1 p-1 rounded-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input
                  className=""
                  type="input"
                  required
                  placeholder="Username"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </label>
            </fieldset>

            <fieldset className="fieldset mb-0.5">
              <legend className="fieldset-legend text-left ml-3 italic ">
                Email
              </legend>
              <label className="input flex items-center validator input-bordered w-full pl-3 border-1 p-1 rounded-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  className="leading-normal"
                  type="input"
                  required
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </label>
            </fieldset>

            <fieldset className="fieldset mb-0.5">
              <legend className="fieldset-legend text-left ml-3 italic ">
                Password
              </legend>
              <label className="input flex items-center validator input-bordered w-full pl-3 border-1 p-1 rounded-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="•••••• "
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pl-3 pr-3 flex items-center pointer-events-auto "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="size-5 text-base hover:text-amber-900" />
                  ) : (
                    <EyeOff className="size-5 text-base hover:text-amber-900" />
                  )}
                </button>
              </label>
            </fieldset>

            <fieldset className="fieldset mb-0.5">
              <legend className="fieldset-legend text-left ml-3 italic ">
                Confirm Password
              </legend>
              <label className="input flex items-center validator input-bordered w-full pl-3 border-1 p-1 rounded-full">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="•••••• "
                  onChange={(e) => (confirmPassword = e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pl-3 pr-3 flex items-center pointer-events-auto "
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                >
                  {showPassword ? (
                    <Eye className="size-5 text-base hover:text-amber-900" />
                  ) : (
                    <EyeOff className="size-5 text-base hover:text-amber-900" />
                  )}
                </button>
              </label>
            </fieldset>
            <button
              type="submit"
              className="btn btn-primary w-full mt-4 "
              disabled={isSignUp}
            >
              {isSignUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <div className="text-center">
            <div className="text-base-content/60">
              Already have an account ?{" "}
              <Link to={"/login"} className="link link-primary">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* phan ben phai */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friend , share moments , and stay in touch with your loved ones "
      />
    </div>
  );
};

export default SignUpPage;
