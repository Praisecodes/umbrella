import { Button, HText, Input, Text } from "@/src/components/common";
import { LOGIN_SCHEMA } from "@/src/helpers/schemas";
import { getMetrics, handleFormTextChange, supabase, validateForm } from "@/src/helpers/utils";
import AuthLayout from "@/src/layouts/auth";
import { authService } from "@/src/services";
import { useUserStore } from "@/src/stores/zustand";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { toast } from "sonner-native";
import { InferType } from "yup";

type ILoginSchema = InferType<typeof LOGIN_SCHEMA>;

export default function Login() {
  const { user, setUser } = useUserStore(state => state);
  const [payload, setPayload] = useState<ILoginSchema>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleForgotPassword = async () => { }

  const handleLogin = async () => {
    setLoading(true);

    try {
      await validateForm(LOGIN_SCHEMA, payload,
        async () => {
          const { data, error } = await authService.login(payload);

          if (!!error) {
            const err = error;
            switch (err.code) {
              case "email_not_confirmed":
                const { error } = await supabase.auth.signInWithOtp(payload);
                if (error) {
                  toast.error(error.message);
                  return;
                }

                router.navigate({
                  pathname: "/otp",
                  params: { email: payload.email }
                });
                break;
              default:
            }

            toast.error(err.message);
            return;
          }

          // console.log("Data from sign-in:", JSON.stringify(data.user.user_metadata, null, 2));
          setUser(data.user.user_metadata as IUser);
          router.replace("/(tabs)/home");
        },
      )
    } finally {
      setLoading(false);
    }
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
            loading={loading}
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
