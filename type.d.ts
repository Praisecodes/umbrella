interface IUser {
  id: string,
  aud: "authenticated",
  role: "authenticated",
  email: string,
  email_confirmed_at: string,
  phone: string,
  confirmation_sent_at: string,
  confirmed_at: string,
  last_sign_in_at: string,
  app_metadata: {
    provider: "email" | "phone",
    providers: [
      "email"
    ]
  },
  user_metadata: {
    email: string,
    email_verified: boolean,
    phone_verified: boolean,
    sub: string
  },
  identities: [
    {
      identity_id: string,
      id: string,
      user_id: string,
      identity_data: {
        email: string,
        email_verified: boolean,
        phone_verified: boolean,
        sub: string,
      },
      provider: "email" | "phone",
      last_sign_in_at: string,
      created_at: string,
      updated_at: string,
      email: string,
    }
  ],
  created_at: string,
  updated_at: string,
  is_anonymous: boolean
}

interface IUserPreferences {

}

interface IAdminSettings {

}

interface IErrorResponse {
  message: string;
  data: any;
  status: string;
}
