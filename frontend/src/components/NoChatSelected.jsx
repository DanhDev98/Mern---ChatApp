import { MessageSquare } from "lucide-react";
const NoChatSelected = () => {
  return (
    <div className=" flex flex-col  flex-1 items-center justify-center bg-base-100/50 p-16">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="size-16 rounded-2xl bg-primary flex items-center justify-center animate-bounce">
              <MessageSquare className="size-8 text-primary-content" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-base-content">
          Wellcome to ChatApp!!!
        </h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting{" "}
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
