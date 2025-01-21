import {buildingService} from "../serviceInit"
import { Request, Response } from "express";

const buildingCreateController = () => {
    return function (req:Request, res:Response) {
        const response = buildingService.createBuilding(req.body.decoded, req.body.buildingInfo)
        if (!response?.statusCode) {
            res.status(500).json({message: 'Internal server error'});
        } else if (response.statusCode === 404) {
            res.status(404).json({message: 'User not found'});
        } else if (response.statusCode === 200) {
            res.status(200).json({message: 'Building created'});
        }
    }
}
const BuildingController = {buildingCreateController};
export default BuildingController;