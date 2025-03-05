import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoging: false,
  isUpdating: false,
  isCheckAuth: true,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
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
      return toast.success("Dang ky tai khoan thanh cong");
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
      return toast.success("Dang xuat thanh cong");
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  },
  login: async (data) => {
    set({ isLoging: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      return toast.success("Dang nhap thanh cong");
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
      return toast.success("Update hinh anh thanh cong");
    } catch (error) {
      console.log("error update profile", error.message);
      return toast.error(error.response.data.message);
    } finally {
      set({ isUpdating: false });
    }
  },
}));
