import { create } from "zustand";

interface IUseAppSettings {
  onboarded: boolean;
  setOnboarded: (onboarded: boolean) => void;
  adminSettings: IAdminSettings | null;
  setAdminSettings: (adminSettings: IAdminSettings) => void;
  userPreferences: IUserPreferences | null;
  setUserPreferences: (userPreferences: IUserPreferences) => void;
}

const useAppSettings = create<IUseAppSettings>()(set => ({
  onboarded: false,
  adminSettings: null,
  userPreferences: null,
  setOnboarded: (onboarded) => set(() => ({ onboarded })),
  setAdminSettings: (adminSettings) => set(() => ({ adminSettings })),
  setUserPreferences: (userPreferences) => set(() => ({ userPreferences })),
}));

export default useAppSettings;
