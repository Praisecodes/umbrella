import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from "sonner-native";
import '../../global.css';
import { queryClient } from "../helpers/utils";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: colorScheme === "dark" ? "#111111" : "#676767"
            }
          }}
        />

        <Toaster
          position="top-center"
          theme={colorScheme as "light" | "dark"}
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
