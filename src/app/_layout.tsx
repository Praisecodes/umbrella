import { QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from "sonner-native";
import '../../global.css';
import { queryClient, runOnLoad } from "../helpers/utils";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  useEffect(() => {
    runOnLoad();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <StatusBar barStyle={"dark-content"} />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#FFFFFF"
            }
          }}
        />

        <Toaster
          position="top-center"
          theme={"light"}
          visibleToasts={1}
          style={{
            pointerEvents: "none",
          }}
          duration={3000}
          toastOptions={{
            titleStyle: {
              fontFamily: "avenir",
            },
          }}
        />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
