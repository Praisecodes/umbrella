import { Button, HText, Input, Text } from "@/src/components/common";
import { SIGNUP_SCHEMA } from "@/src/helpers/schemas";
import { getMetrics, handleFormTextChange, validateForm } from "@/src/helpers/utils";
import AuthLayout from "@/src/layouts/auth";
import { authService } from "@/src/services";
import { OTPTypes } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { InferType } from "yup";

type ISignupSchema = InferType<typeof SIGNUP_SCHEMA>;

export default function Signup() {
  const [payload, setPayload] = useState<ISignupSchema>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: ""
  });

  const { mutate, isPending } = useMutation({
    mutationFn: authService.signup,
    onSuccess: (_, { email }) => {
      router.replace({
        pathname: "/(auth)/otp",
        params: { email, type: OTPTypes.VERIFY }
      });
    },
    onError: (error: AxiosError, { email, password }) => {
      if (error?.response?.status === 409) {
        router.replace({
          pathname: "/(auth)/login",
          params: { email, password }
        });
      }
    }
  });

  const handleSignup = async () => {
    await validateForm(SIGNUP_SCHEMA, payload,
      async () => {
        mutate(payload);
      },
    )
  }

  const handleLogin = () => {
    router.replace("/(auth)/login");
  }

  return (
    <AuthLayout>
      <View style={styles.container} className={`flex-1`}>
        <HText
          className={`text-black capitalize text-center`}
          size="header1"
        >
          create your <HText size="header1" className={`text-primary capitalize`}>umbrella</HText> account
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
            label="First Name"
            placeholder="Enter your first name"
            value={payload.firstName}
            onChangeText={(e) => handleFormTextChange(setPayload, "firstName", e)}
          />

          <Input
            label="Last Name"
            placeholder="Enter your last name"
            value={payload.lastName}
            onChangeText={(e) => handleFormTextChange(setPayload, "lastName", e)}
          />

          <Input
            label="Username"
            placeholder="Choose a username"
            value={payload.username}
            onChangeText={(e) => handleFormTextChange(setPayload, "username", e)}
            autoCapitalize={"none"}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={payload.password}
            onChangeText={(e) => handleFormTextChange(setPayload, "password", e)}
          />
        </View>

        <View style={{ gap: getMetrics(15) }}>
          <Button
            text="CREATE ACCOUNT"
            onPress={handleSignup}
            loading={isPending}
          />
          <TouchableOpacity onPress={handleLogin}>
            <Text className={`text-dark text-center`} size="15">
              Already have an account? <Text size="15" className={`text-primary`}>Login</Text>
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
