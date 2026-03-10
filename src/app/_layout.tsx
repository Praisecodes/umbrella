import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
