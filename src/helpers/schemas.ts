import { object, ref, string } from 'yup';

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

export const LOGIN_SCHEMA = object({
  email: string()
    .required("Enter your email to continue")
    .matches(EMAIL_REGEX, {
      message: "Enter a valid email address"
    }),
  password: string()
    .required("Enter your password to continue"),
});

export const SIGNUP_SCHEMA = object({
  email: string()
    .required("Enter your email address to continue")
    .matches(EMAIL_REGEX, {
      message: "Enter a valid email address"
    }),
  firstName: string()
    .required("Enter your first name to continue"),
  lastName: string()
    .required("Enter your last name"),
  username: string()
    .required("Enter your username"),
  password: string()
    .required("Enter your password to continue")
    .matches(PASSWORD_REGEX, {
      message: "Ensure your password matches all the rules"
    })
});

export const REQUEST_OTP_SCHEMA = object({
  email: string()
    .required("Please enter your email address")
    .matches(EMAIL_REGEX, {
      message: "Enter a valid email address"
    }),
  type: string()
    .required("Type is required")
    .oneOf(["verify", "reset"], "Type must be one of 'verify' or 'reset'"),
});

export const VERIFY_OTP_SCHEMA = object({
  email: string()
    .required("Please enter your email")
    .matches(EMAIL_REGEX, {
      message: "Enter a valid email address"
    }),
  otp: string()
    .required("Enter the OTP in your inbox")
    .length(4, "Enter a valid OTP"),
  type: string()
    .required("Type is required")
    .oneOf(["verify", "reset"], "Type must be one of 'verify' or 'reset'"),
});

export const RESET_PASSWORD_SCHEMA = object({
  password: string()
    .required("Enter your new password")
    .matches(PASSWORD_REGEX, {
      message: "Your password must be at least 6 character long and contain at least 1 digit, 1 uppercase and one lowercase letter"
    }),
  confirmPassword: string()
    .required("Please confirm your new password")
    .oneOf([ref("password")], "Passwords do not match"),
  token: string()
    .required("Token is required"),
});
