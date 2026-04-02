import { InferType } from "yup";
import { LOGIN_SCHEMA, SIGNUP_SCHEMA } from "../helpers/schemas";
import { supabase } from "../helpers/utils";

type ILoginPayload = InferType<typeof LOGIN_SCHEMA>;
type ISignupPayload = InferType<typeof SIGNUP_SCHEMA>;

class AuthService {
  signup = async (payload: ISignupPayload) => {
    const { email, password, ...rest } = payload;
    return await supabase.auth.signUp({
      email, password,
      options: {
        data: { ...rest }
      }
    });
  }

  login = async (payload: ILoginPayload) => {
    return await supabase.auth.signInWithPassword(payload);
  }
}

const authService = new AuthService();

export default authService;
