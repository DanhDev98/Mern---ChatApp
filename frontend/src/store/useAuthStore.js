import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoging: false,
  isUpdating: false,
  isCheckAuth: true,

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
}));
