import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { toast } from 'sonner-native';
import { string, ValidationError } from 'yup';
import { Button, HText, Input, Text } from '../components/common';
import { getMetrics, supabase } from '../helpers/utils';
import AuthLayout from '../layouts/auth';

const Otp = () => {
  const { email } = useLocalSearchParams();
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleVerfifyOtp = async () => {
    try {
      setLoading(true);
      await string()
        .required("Enter the OTP in your mailbox to continue")
        .length(6, "OTP must be 6 digits")
        .validate(otp, { abortEarly: false });

      const { data, error } = await supabase.auth.verifyOtp({
        email: email as string,
        token: otp,
        type: 'email'
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      // Use the data returned, here

      router.replace("/(tabs)/home");
    } catch (error) {
      if (error instanceof ValidationError) {
        toast.error(error.errors.join("\n"));
      }
    } finally {
      setLoading(false);
    }
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
          placeholder='e.g. 123456'
          maxLength={6}
          keyboardType='numeric'
          value={otp}
          onChangeText={setOtp}
        />
      </View>

      <Button
        text='VERIFY OTP'
        onPress={handleVerfifyOtp}
        loading={loading}
        disabled={!otp}
      />
    </AuthLayout>
  )
}

export default Otp;

const styles = StyleSheet.create({});