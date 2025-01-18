import { Request, Response } from "express";
import {userService} from "../serviceInit"

const loginController = () => {
    return async function (req: Request, res: Response) {
        try {
            console.log("Trying to login");
            const response = await userService.authenticateUser(req.body.email, req.body.password);
            console.log(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal server error"
            });
        }
    }
}

const registerController = () => {
    return async function (req: Request, res: Response) {
        try {
            console.log("Trying to register");
            const response = await userService.registerUser(req.body.email, req.body.password, req.body.firstName, req.body.lastName, req.body.phoneNumber, req.body.dateOfBirth);
            console.log(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal server error"
            });
        }
    }
}

const UserController = {registerController, loginController};
export default UserController;