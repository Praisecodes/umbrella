interface IUser {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  username: string,
  emailVerified: boolean,
  createdAt: string,
  updatedAt: string,
}

interface IClient { }

interface IUserPreferences {

}

interface IAdminSettings {

}

interface IErrorResponse {
  message: string;
  data: any;
  status: string;
}

interface IResponse {
  statusCode: number,
  message: string,
  data: any | null,
  errors?: string[]
}
