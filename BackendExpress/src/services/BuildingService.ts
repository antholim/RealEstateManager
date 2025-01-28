import { IEnvService } from "../interfaces/EnvService";
import { buildingType, IBuildingService,Building } from "../interfaces/IBuildingService";
import mongoose from "mongoose";
import { User } from "../models/User";
export default class BuildingService implements IBuildingService {
    private EnvService;
    constructor(EnvService: IEnvService) {
        this.EnvService = EnvService;
    }

    createBuilding(email:string, buildingInfo:Building) {
        try {
            User.findOne({email: email}, (err:Error, user) => {
                if (err) {
                    console.log(err)
                } else {
                    user.buildings.push(buildingInfo);
                    return {message : "Building successfully created", statusCode : 200}
                }
            })
        } catch (error) {
            return { message: 'User not found', statusCode : 404 }
        }
    }
    removeBuilding() {

    }
    editBuilding () {

    }
    readBuilding (email:string) {
        try {
            User.findOne({email: email}, (err : Error, user) => {
                if (err) {
                    console.log(err)
                } else {
                    return {message:"Read successfully", statusCode : 200, data : user.buildings};
                }
            })
        } catch (error) {
            return { message: 'User not found', statusCode : 404 }
        }
    }
}