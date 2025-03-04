import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants/theme";
import { Send } from "lucide-react";

const PREVIEW_MESSAGE = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features",
    isSent: true,
  },
];
const SettingPage = () => {
  const { themes, setThemes } = useThemeStore();

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl text-center">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Themes</h2>
          <p className="text-sm text-base-content/70">
            Choose a theme for your chat interface
          </p>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                themes === t ? "bg-base-200" : "hover:bg-base-200/50"
              }`}
              key={t}
              onClick={() => setThemes(t)}
            >
              <div
                className="relative h-8 w-full rounded-md overflow-hidden "
                data-theme={t}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1 ">
                  <div className="rounded font-semibold text-white bg-primary">
                    A
                  </div>
                  <div className="rounded font-semibold text-white bg-secondary">
                    B
                  </div>
                  <div className="rounded font-semibold text-white bg-accent">
                    C
                  </div>
                  <div className="rounded font-semibold text-white bg-neutral">
                    D
                  </div>
                </div>
              </div>
              <span className="text-[12px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>
        {/**preview section design */}
        <h3 className="text-lg font-semibold mb-3">Preview</h3>
        <div className="rounded-xl border border-base-300 bg-base-100">
          <div className="bg-base-200 p-4">
            <div className="max-w-lg mx-auto bg-amber-200">
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-semibold"></div>
                    <div>
                      <h3 className="font-medium text-sm">Danh Dev</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-base-300 bg-base-100">
          <div className="flex gap-2">
            <input
              type="text"
              className="input flex-1 text-sm h-10"
              placeholder="Type a message ..."
              value="This is a preview"
              readOnly
            />
            <button className="btn btn-primary h-10 min-h-0 flex items-center justify-center">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
