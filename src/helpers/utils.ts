import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, processLock } from "@supabase/supabase-js";
import { QueryClient } from "@tanstack/react-query";
import { SplashScreen } from "expo-router";
import { Dispatch, SetStateAction } from "react";
import { Dimensions, PixelRatio, Platform } from "react-native";
import { toast } from "sonner-native";
import { AnyObject, ObjectSchema, ValidationError } from "yup";
import { getData } from "../stores/async_storage";
import { useAppSettings, useUserStore } from "../stores/zustand";
import { EXPO_PUBLIC_ONBOARDED_KEY, EXPO_PUBLIC_SUPABASE_KEY, EXPO_PUBLIC_SUPABASE_URL } from "./env";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const PHONE_BASE_WIDTH = Platform.OS === "android" ? 412 : 420;
const TABLET_BASE_WIDTH = 768;

const isTablet = Math.min(WIDTH, HEIGHT) >= 600;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);


const scale = (size: number) => {
  const baseWidth = isTablet ? TABLET_BASE_WIDTH : PHONE_BASE_WIDTH;

  const maxScaleFactor = isTablet ? 1.25 : 1.15;
  const minScaleFactor = 0.85;

  const scaleFactor = clamp(
    WIDTH / baseWidth,
    minScaleFactor,
    maxScaleFactor
  );

  return size * scaleFactor;
};

const getMetrics = (size: number) =>
  Math.round(PixelRatio.roundToNearestPixel(scale(size)));

const queryClient = new QueryClient();

const supabase = createClient(
  EXPO_PUBLIC_SUPABASE_URL,
  EXPO_PUBLIC_SUPABASE_KEY,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      lock: processLock,
    },
  }
);

const runOnLoad = async () => {
  const { setOnboarded } = useAppSettings.getState();
  const { setUser, setSession } = useUserStore.getState();

  setOnboarded(!!await getData(EXPO_PUBLIC_ONBOARDED_KEY));
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    toast.error(error.message);
  } else {
    const user = data.session?.user.user_metadata;
    const session = data.session;

    if (!!user && !!session) {
      setUser(user as IUser);
      setSession(session);
    }
  }

  SplashScreen.hideAsync();
}

const validateForm = async <T extends AnyObject>(
  schema: ObjectSchema<T>,
  payload: T,
  successCallback: () => Promise<void>,
  errorCallback?: (payload: T) => Promise<void>,
) => {
  try {
    await schema.validate(payload, { abortEarly: false });

    await successCallback();
  } catch (error) {
    if (error instanceof ValidationError) {
      toast.error(error.errors.join("\n"));
      await errorCallback?.(payload);
    } else {
      throw error;
    }
  }
}

const handleFormTextChange = <
  T extends object,
  K extends keyof T
>(
  setPayload: Dispatch<SetStateAction<T>>,
  key: K,
  value: T[K],
) => {
  setPayload(prev => ({
    ...prev,
    [key]: value
  }));
}

export {
  getMetrics,
  handleFormTextChange,
  queryClient,
  runOnLoad,
  supabase,
  validateForm,
  WIDTH
};

