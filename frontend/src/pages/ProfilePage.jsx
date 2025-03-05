import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdating, updateProfilePic } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Img = reader.result;
      setSelectedImg(base64Img);
      await updateProfilePic({ profilePic: base64Img });
    };
  };

  console.log("check o profile", authUser);
  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8 ">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="profilePic"
                className="rounded-full border-4 size-32 object-cover"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute right-0 bottom-0 
                bg-base-content hover:scale-105 p-2
                 rounded-full cursor-pointer transition-all duration-200 
                 ${isUpdating ? "animate-pulse pointer-events-none" : ""}`}
              >
                <Camera className="size-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleUploadPic}
                  disabled={isUpdating}
                />
              </label>
            </div>
          </div>
          <p className="text-sm text-zinc-400">
            {isUpdating
              ? "Uploading ..."
              : "Click the camera icon to update your photo"}
          </p>
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
                placeholder={authUser?.email}
                disabled
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
              <input type="password" placeholder="•••••• " disabled />
            </label>
          </fieldset>

          <div className="mt-6 bg-base-300 rounded-xl p-6 ">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span className="pr-1">Member since </span>
                <span className="font-bold">
                  {formatDate(authUser.createdAt?.split("T")[0])}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
