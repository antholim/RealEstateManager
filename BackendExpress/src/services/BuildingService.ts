import { IEnvService } from "../interfaces/EnvService";
import { buildingType, IBuildingService,Building } from "../interfaces/IBuildingService";
import mongoose from "mongoose";
import { User } from "../models/User";
export default class BuildingService implements IBuildingService {
    private EnvService;
    constructor(EnvService: IEnvService) {
        this.EnvService = EnvService;
    }

    createBuilding(decoded:any, buildingInfo:Building) {
        try {
            const email:string = decoded.email;
            User.findOne({email: email}, (err, user) => {
                if (err) {
                    console.log(err)
                } else {
                    user.buildings.push(buildingInfo);
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
    readBuilding () {

    }
}