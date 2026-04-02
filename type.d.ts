interface IUser {
  email: string,
  email_verified: boolean,
  firstName: string,
  lastName: string,
  phone_verified: boolean,
  sub: string,
  username: string,
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
