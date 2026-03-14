import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from "sonner-native";
import '../../global.css';
import { queryClient } from "../helpers/utils";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
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
