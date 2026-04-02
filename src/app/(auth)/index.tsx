import { Button, HText, Text } from "@/src/components/common";
import { EXPO_PUBLIC_ONBOARDED_KEY } from "@/src/helpers/env";
import { getMetrics, WIDTH } from "@/src/helpers/utils";
import RootLayout from "@/src/layouts/root_layout";
import { storeData } from "@/src/stores/async_storage";
import { useAppSettings } from "@/src/stores/zustand";
import { Image } from "expo-image";
import { Redirect, router } from "expo-router";
import { useRef, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";

const INDICATOR_WIDTH = getMetrics(8);
const INDICATOR_WIDTH_EXPANDED = getMetrics(32);

const Indicator = ({ isActive }: { isActive: boolean }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(
        isActive ? INDICATOR_WIDTH_EXPANDED : INDICATOR_WIDTH,
        { duration: 250 }
      ),
    };
  });

  return (
    <Animated.View
      className={`${isActive ? "bg-primary" : "bg-primary-a10"} rounded-full`}
      style={[
        animatedStyle,
        { height: getMetrics(8) }
      ]}
    />
  );
};

export default function Index() {
  const flatListRef = useRef<FlatList>(null);
  const [screenFocused, setScreenFocused] = useState<number>(0);
  const { onboarded } = useAppSettings();

  const CAROUSEL = [
    {
      title: "Unified Workspace",
      image: require("@/assets/images/onboarding/one.png"),
      text: "All your clients in one place. Say goodbye to tab-switching. Manage multiple brands from a single, unified workspace.",
    },
    {
      title: "Smart Scheduling",
      image: require("@/assets/images/onboarding/two.png"),
      text: "Never miss a post, set recurring schedules and receive intelligent reminder to keep your clients feed fresh",
    },
    {
      title: "Actionable Insight",
      image: require("@/assets/images/onboarding/three.png"),
      text: "Generate professional reports and track performance across all platforms with a single click",
    },
  ];

  const handleCreateAccountPressed = async () => {
    if (screenFocused === 2) {
      if (await storeData(EXPO_PUBLIC_ONBOARDED_KEY, "true")) {
        router.replace("/(auth)/signup");
      }
    } else {
      flatListRef.current?.scrollToIndex({ index: screenFocused + 1, animated: true });
    }
  }
  const handleLoginPressed = async () => {
    if (screenFocused === 2) {
      if (await storeData(EXPO_PUBLIC_ONBOARDED_KEY, "true")) {
        router.replace("/(auth)/login");
      }
    } else if (screenFocused === 0) {
      handleSkipPressed();
    } else {
      flatListRef.current?.scrollToIndex({ index: screenFocused - 1, animated: true });
    }
  }

  const handleSkipPressed = async () => {
    if (await storeData(EXPO_PUBLIC_ONBOARDED_KEY, "true")) {
      router.replace("/(auth)/login");
    }
  }

  if (onboarded) return <Redirect href={"/(auth)/login"} />

  return (
    <RootLayout>
      <View style={styles.container} className={`flex-1`}>
        <View className={`items-end ${screenFocused !== 0 ? "opacity-100" : "opacity-0"} justify-end`} style={{ paddingHorizontal: getMetrics(20) }}>
          <TouchableOpacity onPress={handleSkipPressed}>
            <Text className={`text-dark`}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          ref={flatListRef}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          showsHorizontalScrollIndicator={false}
          data={CAROUSEL}
          keyExtractor={(_, index) => index.toString()}
          pagingEnabled
          renderItem={({ item }) => (
            <View
              style={{
                width: WIDTH,
                paddingHorizontal: getMetrics(20),
                gap: getMetrics(45),
              }}
              className={`items-center justify-center`}
            >
              <HText size="header2" className={`text-primary text-center`}>
                {item.title}
              </HText>

              <Image
                source={item.image}
                contentFit="contain"
                style={{
                  width: "100%",
                  height: getMetrics(270),
                }}
              />

              <Text className={`text-dark text-center w-[80%]`}>
                {item.text}
              </Text>
            </View>
          )}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / WIDTH);
            setScreenFocused(index);
          }}
        />

        <View
          className={`flex flex-row justify-center items-center`}
          style={{
            gap: getMetrics(5),
          }}
        >
          {CAROUSEL.map((_, index) => (
            <Indicator
              key={index}
              isActive={screenFocused === index}
            />
          ))}
        </View>

        <View
          style={{
            gap: getMetrics(10),
            paddingHorizontal: getMetrics(20),
          }}
        >
          <Button
            text={screenFocused !== 2 ? "Next" : "Create Your Account"}
            onPress={handleCreateAccountPressed}
          />

          <Button
            text={screenFocused === 0 ? "Skip" : screenFocused !== 2 ? "Back" : "Log Into Your Account"}
            outline
            onPress={handleLoginPressed}
          />
        </View>
      </View>
    </RootLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: getMetrics(25),
    paddingTop: getMetrics(15),
  }
});
