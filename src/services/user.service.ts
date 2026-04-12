import ApiClient from "../helpers/api_client";

class UserService {
  private path = "/user";

  getSession = async () => {
    return await ApiClient.get(`${this.path}/getSession`);
  }
}

const userService = new UserService();
export default userService;
