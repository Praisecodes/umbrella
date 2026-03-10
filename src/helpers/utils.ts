import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, processLock } from "@supabase/supabase-js";
import { QueryClient } from "@tanstack/react-query";
import { Dimensions, PixelRatio, Platform } from "react-native";
import { EXPO_PUBLIC_SUPABASE_KEY, EXPO_PUBLIC_SUPABASE_URL } from "./env";

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

const runOnLoad = async () => { }

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

export {
  getMetrics,
  queryClient,
  runOnLoad, supabase, WIDTH
};

