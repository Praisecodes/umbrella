import { Button, HText, Input } from '@/src/components/common';
import { RESET_PASSWORD_SCHEMA } from '@/src/helpers/schemas';
import { getMetrics, handleFormTextChange, validateForm } from '@/src/helpers/utils';
import AuthLayout from '@/src/layouts/auth';
import { authService } from '@/src/services';
import { useMutation } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { toast } from 'sonner-native';
import { InferType } from 'yup';

const NewPassword = () => {
  const { email, token } = useLocalSearchParams<Record<string, string>>();
  const [payload, setPayload] = useState<InferType<typeof RESET_PASSWORD_SCHEMA>>({
    password: "",
    confirmPassword: "",
    token,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: ({ data }) => {
      toast.success(data.message);
    },
    onError: () => { }
  });

  const handleResetPassword = async () => {
    await validateForm(
      RESET_PASSWORD_SCHEMA,
      payload,
      async () => {
        mutate(payload);
      },
    )
  }

  return (
    <AuthLayout>
      <View style={styles.container} className={`flex-1`}>
        <HText
          className={`text-black capitalize text-center`}
          size="header1"
        >
          reset your account password
        </HText>

        <View style={styles.formContainer}>
          <Input
            label="Password"
            placeholder="Enter your new password"
            secureTextEntry
            value={payload.password}
            onChangeText={(e) => handleFormTextChange(setPayload, "password", e)}
          />

          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            secureTextEntry
            value={payload.confirmPassword}
            onChangeText={(e) => handleFormTextChange(setPayload, "confirmPassword", e)}
          />
        </View>

        <View style={{ gap: getMetrics(15) }}>
          <Button
            text="RESET PASSWORD"
            onPress={handleResetPassword}
            loading={isPending}
          />
        </View>
      </View>
    </AuthLayout>
  )
}

export default NewPassword;

const styles = StyleSheet.create({
  container: {
    gap: getMetrics(45),
    paddingTop: getMetrics(25),
  },
  formContainer: {
    gap: getMetrics(15),
  }
});
