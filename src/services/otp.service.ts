import { InferType } from "yup";
import ApiClient from "../helpers/api_client";
import { REQUEST_OTP_SCHEMA, VERIFY_OTP_SCHEMA } from "../helpers/schemas";

type IVerifyPayload = InferType<typeof VERIFY_OTP_SCHEMA>;
type IRequestPayload = InferType<typeof REQUEST_OTP_SCHEMA>;

class OTPService {
  private path = "/otp";

  verifyOTP = async (payload: IVerifyPayload) => {
    return await ApiClient.post(`${this.path}/verify`, payload);
  }

  requestOTP = async (payload: IRequestPayload) => {
    return await ApiClient.post(`${this.path}/request`, payload);
  }
}

const otpService = new OTPService();
export default otpService;
