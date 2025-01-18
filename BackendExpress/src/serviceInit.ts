import EnvService from "./services/EnvService";
import UserService from "./services/UserService";

export const userService = new UserService(EnvService);