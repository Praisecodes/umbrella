import { VERIFY_OTP_SCHEMA } from '@/src/helpers/schemas';
import { otpService } from '@/src/services';
import { OTPTypes } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HText, Input, Text } from '../../components/common';
import { getMetrics, validateForm } from '../../helpers/utils';
import AuthLayout from '../../layouts/auth';

const Otp = () => {
  const { email, type } = useLocalSearchParams();
  const [otp, setOtp] = useState<string>("");

  const { mutate, isPending } = useMutation({
    mutationFn: otpService.verifyOTP,
    onSuccess: ({ data }, { email, type }) => {
      console.log("Data from OTP Verification", JSON.stringify(data.data, null, 2));
      if (type === OTPTypes.RESET) {
        router.replace({
          pathname: "/(auth)/forgot_password/new_password",
          params: { email, token: data.data.sessionToken }
        });
      }
    },
    onError: () => { },
  });

  const handleVerfifyOtp = async () => {
    const payload = {
      email: email as string,
      otp,
      type: type as OTPTypes
    }

    await validateForm(VERIFY_OTP_SCHEMA, payload,
      async () => {
        mutate(payload);
      },
    );
  }

  return (
    <AuthLayout>
      <View className={`flex-1 justify-center`} style={{ gap: getMetrics(15) }}>
        <View>
          <HText size='header1' className={`text-center`}>
            Email Verification
          </HText>
          <Text size='15' className={`text-black-a70 text-center`}>
            An OTP was sent to your email <Text size='15' className={`text-primary-a70 underline`}>{email}</Text>
          </Text>
        </View>

        <Input
          placeholder='e.g. 1234'
          maxLength={4}
          keyboardType='numeric'
          value={otp}
          onChangeText={setOtp}
        />
      </View>

      <Button
        text='VERIFY OTP'
        onPress={handleVerfifyOtp}
        loading={isPending}
        disabled={!otp}
      />
    </AuthLayout>
  )
}

export default Otp;

const styles = StyleSheet.create({});