import BuildingService from "./services/BuildingService";
import EnvService from "./services/EnvService";
import UserService from "./services/UserService";

export const userService = new UserService(EnvService);
export const buildingService = new BuildingService(EnvService);