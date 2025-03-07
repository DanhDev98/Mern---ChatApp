import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoging: false,
  isUpdating: false,
  isCheckAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error from checkauth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Dang ky tai khoan thanh cong");
      get().connectSocket();
      window.location.reload();
    } catch (error) {
      return toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Dang xuat thanh cong");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  login: async (data) => {
    set({ isLoging: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Dang nhap thanh cong");
      get().connectSocket();
      window.location.reload();
    } catch (error) {
      return toast.error(error.response.data.message);
    } finally {
      set({ isLoging: false });
    }
  },

  updateProfilePic: async (data) => {
    set({ isUpdating: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Update hinh anh thanh cong");
    } catch (error) {
      console.log("error update profile", error.message);
      return toast.error(error.response.data.message);
    } finally {
      set({ isUpdating: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      query: { userId: authUser._id },
    });
    socket.connect();
    set({ socket: socket });
    socket.on("userOnline", (userId) => {
      set({ onlineUsers: userId });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
      set({ socket: null });
    }
  },
}));
