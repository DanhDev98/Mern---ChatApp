import SidebarSkeleton from "./skeleton/SidebarSkeleton";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { Users } from "lucide-react";
const Sidebar = () => {
  const { users, selectedUser, getUser, setselectedUser, isUserLoading } =
    useChatStore();
  const userOnline = [];
  // useEffect(() => {
  //   getUser();
  // }, [getUser]);
  console.log("check list user", users);
  if (isUserLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5 ">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className=" hidden font-medium lg:block">Contacts</span>
        </div>
      </div>
      <div className="overflow-y-auto w-full py-3">
        {users.map((user) => (
          // <button
          //   key={user._id}
          //   onClick={setselectedUser(user)}
          //   className={`w-full p-3 gap-3 flex items-center hover:bg-base-300 transition-colors ${
          //     selectedUser?._id === user._id
          //       ? "bg-base-300 ring-1 ring-base-300"
          //       : ""
          //   }`}
          // >
          //   <div className="relative mx-auto lg:mx-0">
          //     <div className="skeleton size-12 rounded-full">
          //       <img
          //         src={user.profilePic || "/avatar.png"}
          //         alt={user.fullName}
          //         className="size-12 object-cover rounded-full"
          //       />
          //       {userOnline.includes(user._id) && (
          //         <span className="absolute bottom-0 right-0 bg-green-500 border-2 border-white rounded-full h-3 w-3"></span>
          //       )}
          //     </div>
          //   </div>

          //   {/* user info skeleton */}
          //   <div className="hidden lg:block text-left min-w-0 flex-1">
          //     <div className="font-medium truncate">{user.fullName}</div>
          //     <div className="text-sm text-zinc-400 ">
          //       {userOnline.includes(user._id) ? "Online" : "Offline"}
          //     </div>
          //   </div>
          // </button>
          <div>helllo ne</div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
