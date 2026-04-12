import { InferType } from "yup";
import ApiClient from "../helpers/api_client";
import { LOGIN_SCHEMA, RESET_PASSWORD_SCHEMA, SIGNUP_SCHEMA } from "../helpers/schemas";

type ILoginPayload = InferType<typeof LOGIN_SCHEMA>;
type ISignupPayload = InferType<typeof SIGNUP_SCHEMA>;
type IResetPasswordPayload = InferType<typeof RESET_PASSWORD_SCHEMA>;

class AuthService {
  private path = '/auth';

  signup = async (payload: ISignupPayload) => {
    return await ApiClient.post(`${this.path}/signup`, payload);
  }

  login = async (payload: ILoginPayload) => {
    return await ApiClient.post(`${this.path}/login`, payload);
  }

  resetPassword = async (payload: IResetPasswordPayload) => {
    return await ApiClient.post(`${this.path}/reset-password`, payload);
  }
}

const authService = new AuthService();

export default authService;
