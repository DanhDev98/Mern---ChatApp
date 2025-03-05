import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, X } from "lucide-react"


const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();
    const handleChageImage = (e) => { }

    const removeImage = () => { }
    const handleSendMessage = async () => { }
    return (
        <div className="p-4 h-full">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-zinc-700" />
                        <button onClick={removeImage} className="absolute -top-1.5 -right-1.5 bg-base-300 w-5 h-5 rounded-full flex items-center justify-center" type="button">
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex flex-1 gap-2"></div>
                <input type="text"
                    className="w-full input rounded-3xl input-sm sm:input-md"
                    placeholder="Type a message ..."
                    value={text}
                    onChange={(e) => setText(e.target.value)} />
                <input type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleChageImage} />

                <button
                    onClick={() => fileInputRef.current?.click()}
                    className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                    type="button">
                    <Image size={20} />
                </button>
            </form>
        </div>
    )
}

export default MessageInput