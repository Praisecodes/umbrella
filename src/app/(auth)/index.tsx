import { Button, HText, Input, Text } from "@/src/components/common";
import { getMetrics } from "@/src/helpers/utils";
import AuthLayout from "@/src/layouts/auth";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [payload, setPayload] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleForgotPassword = async () => { }

  const handleLogin = async () => { }

  return (
    <AuthLayout>
      <View style={styles.container} className={`flex-1`}>
        <HText
          className={`text-white capitalize text-center`}
          size="header1"
        >
          login to your account
        </HText>

        <View style={styles.formContainer}>
          <Input
            label="Email Address"
            placeholder="Enter your email address"
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
          />

          <View className={`flex items-end`}>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text size="15" className={`text-[#00ff00] underline`}>
                Forgot Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Button
          text="LOG IN"
          onPress={handleLogin}
        />
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: getMetrics(45),
    paddingTop: getMetrics(25),
  },
  formContainer: {
    gap: getMetrics(15),
  }
})
