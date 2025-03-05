import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { create } from "zustand";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUser: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessage: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  setselectedUser: (selectedUser) => {
    set({ selectedUser });
  },
}));
