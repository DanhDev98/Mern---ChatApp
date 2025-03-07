import SidebarSkeleton from "./skeleton/SidebarSkeleton";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
const Sidebar = () => {
  const { getUser, users, selectedUser, setselectedUser, isUserLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlyUserOnline, setShowOnlyUserOnline] = useState(false);
  useEffect(() => {
    getUser();
  }, [getUser])

  const filteredUsers = showOnlyUserOnline ? users.filter(user => onlineUsers.includes(user._id)) : users;
  if (isUserLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col  transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5 ">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="hidden font-medium lg:block ">Contacts</span>
        </div>

        {/* filtered user online if want */}

        <div className="mt-4 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input type="checkbox"
              className="checkbox checkbox-sm"
              checked={showOnlyUserOnline}
              onChange={(e) => setShowOnlyUserOnline(e.target.checked)} />
            <span className="text-sm ">Show only user online</span>
          </label>
          <span className="text-xs text-zinc-500">{onlineUsers.length - 1} online </span>
        </div>
      </div>
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setselectedUser(user)}
            className={`w-full p-3 gap-3 flex items-center hover:bg-base-300 transition-colors ${selectedUser?._id === user._id
              ? "bg-base-300 ring-1 ring-base-300"
              : ""
              }`}
          >
            <div className="relative mx-auto lg:mx-0">
              <div className=" size-11 rounded-full">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="size-11 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) ? (
                  <span className="absolute top-0 right-0 bg-green-500 rounded-full ring-2 size-2.5 ring-zinc-900"></span>
                ) : (<span className="absolute top-0 right-0 bg-gray-400 rounded-full ring-2 size-2.5 ring-zinc-900"></span>)}
              </div>
            </div>

            {/* user info skeleton */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-medium truncate ">{user.fullName}</div>
              <div className="text-sm italic ">
                <span className={onlineUsers.includes(user._id) ? "text-green-500" : "text-zinc-400"}>
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && (
          <div className="text-center font-medium text-zinc-500 py-4">No user online</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
