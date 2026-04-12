import { Button, HText, Input, Text } from "@/src/components/common";
import { LOGIN_SCHEMA } from "@/src/helpers/schemas";
import { getMetrics, handleFormTextChange, validateForm } from "@/src/helpers/utils";
import AuthLayout from "@/src/layouts/auth";
import { authService } from "@/src/services";
import { useMutation } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { InferType } from "yup";

type ILoginSchema = InferType<typeof LOGIN_SCHEMA>;

export default function Login() {
  const { email, password } = useLocalSearchParams<Record<string, string>>();
  const [payload, setPayload] = useState<ILoginSchema>({
    email: email ?? "",
    password: password ?? ""
  });

  const { mutate, isPending } = useMutation({
    mutationFn: authService.login,
    onSuccess: ({ data }) => {
    },
    onError: () => { }
  });

  const handleForgotPassword = async () => {
    router.navigate({
      pathname: "/(auth)/forgot_password",
      params: { email: payload.email }
    });
  }

  const handleLogin = async () => {
    await validateForm(LOGIN_SCHEMA, payload,
      async () => {
        mutate(payload);
      },
    )
  }

  const handleCreateAccount = () => {
    router.replace("/(auth)/signup");
  }

  return (
    <AuthLayout>
      <View style={styles.container} className={`flex-1`}>
        <HText
          className={`text-black capitalize text-center`}
          size="header1"
        >
          login to your account
        </HText>

        <View style={styles.formContainer}>
          <Input
            label="Email Address"
            placeholder="Enter your email address"
            value={payload.email}
            onChangeText={(e) => handleFormTextChange(setPayload, "email", e)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={payload.password}
            onChangeText={(e) => handleFormTextChange(setPayload, "password", e)}
          />

          <View className={`flex items-end`}>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text size="15" className={`text-primary underline`}>
                Forgot Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ gap: getMetrics(15) }}>
          <Button
            text="LOG IN"
            onPress={handleLogin}
            loading={isPending}
          />

          <TouchableOpacity onPress={handleCreateAccount}>
            <Text className={`text-dark text-center`} size="15">
              Don't have an account? <Text size="15" className={`text-primary`}>Create One</Text>
            </Text>
          </TouchableOpacity>
        </View>
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
