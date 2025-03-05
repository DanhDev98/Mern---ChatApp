import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";


const ChatHeader = () => {
    const { selectedUser, setselectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    return (
        <div className="p-2.5 border-b border-base-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* avtatar */}
                    <div className="">
                        <div className="size-10 rounded-full relative">
                            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
                            {onlineUsers.includes(selectedUser._id) ? (
                                <span className="absolute top-0 right-0 bg-green-500 rounded-full ring-2 size-2.5 ring-zinc-900"></span>
                            ) : (<span className="absolute top-0 right-0 bg-gray-400 rounded-full ring-2 size-2.5 ring-zinc-900"></span>)}
                        </div>
                    </div>

                    {/* user info */}
                    <div className="">
                        <h3 className="font-medium">{selectedUser.fullName}</h3>
                        <div className="text-sm italic ">
                            <span className={onlineUsers.includes(selectedUser._id) ? "text-green-500" : "text-zinc-400"}>
                                {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* action buttons */}
                <button onClick={() => setselectedUser(null)}>
                    <X />
                </button>
            </div>
        </div>
    )
}

export default ChatHeader