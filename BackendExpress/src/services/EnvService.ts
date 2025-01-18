import dotenv from "dotenv";
import { IEnvService } from "../interfaces/EnvService";
dotenv.config({path:"../.env"});
/**
 *
 * @param variableKey Name of the variable to be retrieved from .env file
 * @returns Value corresponding to the given key, or undefined if not found
 */
const loadValue = (variableKey: string) :string => {
  return process.env[`${variableKey}`] || "";
};

const EnvService : IEnvService = { loadValue };

export default EnvService;
