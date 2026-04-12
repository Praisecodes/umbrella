import { Button, HText, Input, Text } from '@/src/components/common';
import { REQUEST_OTP_SCHEMA } from '@/src/helpers/schemas';
import { getMetrics, handleFormTextChange, validateForm } from '@/src/helpers/utils';
import AuthLayout from '@/src/layouts/auth';
import { otpService } from '@/src/services';
import { OTPTypes } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { toast } from 'sonner-native';
import { InferType } from 'yup';

const Index = () => {
  const { email: parsedEmail } = useLocalSearchParams();
  const [payload, setPayload] = useState<InferType<typeof REQUEST_OTP_SCHEMA>>({
    email: (parsedEmail as string) ?? "",
    type: OTPTypes.RESET,
  });

  const { mutate: requestOTP, isPending: requestingOTP } = useMutation({
    mutationFn: otpService.requestOTP,
    onSuccess: ({ data }, { email, type }) => {
      toast.success(data.message);
      router.navigate({
        pathname: "/(auth)/otp",
        params: { email, type }
      });
    },
    onError: () => { }
  });

  const handleContinue = async () => {
    await validateForm(
      REQUEST_OTP_SCHEMA,
      payload,
      async () => {
        requestOTP(payload);
      }
    );
  }

  return (
    <AuthLayout>
      <View className={`flex-1 justify-center`} style={{ gap: getMetrics(15) }}>
        <View>
          <HText size='header1' className={`text-center`}>
            Forgot Password
          </HText>
          <Text size='15' className={`text-black-a70 text-center`}>
            Enter your email address below to continue
          </Text>
        </View>

        <Input
          placeholder='e.g. john@doe.example'
          keyboardType='email-address'
          value={payload.email}
          autoCapitalize='none'
          onChangeText={(e) => handleFormTextChange(setPayload, "email", e)}
        />
      </View>

      <Button
        text='CONTINUE'
        onPress={handleContinue}
        loading={requestingOTP}
        disabled={!payload.email}
      />
    </AuthLayout>
  )
}

export default Index;

const styles = StyleSheet.create({});
