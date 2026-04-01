import { object, string } from 'yup';

export const LOGIN_SCHEMA = object({
  email: string()
    .required("Enter your email to continue")
    .email("Enter a valid email address"),
  password: string()
    .required("Enter your password to continue"),
});

export const SIGNUP_SCHEMA = object({
  email: string()
    .required("Enter your email address to continue")
    .email("Enter a valid email address to continue"),
  firstName: string()
    .required("Enter your first name to continue"),
  lastName: string()
    .required("Enter your last name"),
  username: string()
    .required("Enter your username"),
  password: string()
    .required("Enter your password to continue")
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/, {
      message: "Ensure your password matches all the rules"
    })
});
