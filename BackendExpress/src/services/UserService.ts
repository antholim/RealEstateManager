import bcrypt from 'bcrypt';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import { IEnvService } from "../interfaces/EnvService";

export default class UserService {
    private EnvService;
    constructor(EnvService: IEnvService) {
        this.EnvService = EnvService;
    }
    /**
     * Method to register a user and store in database
     * 
     * @param email 
     * @param password 
     * @returns {
     *   status: number,
     *   message: string,
     *   accessToken?: string
     * }
     */
    async registerUser(email: string, password: string, firstName:string,lastName:string,phoneNumber:string,dateOfBirth:string): Promise<any> {
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            let existingUser;
            existingUser = await User.findOne({ email: email });
            if (existingUser) {
                return {
                    status: 409,
                    message: "User already exists"
                }
            }
            const user = await User.create({
                email: email,
                password: hashedPassword,
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                dateOfBirth: dateOfBirth
            });
            return {
                status: 200,
                message: "User created"
            }
        } catch (error) {
            console.error(error);
            return {
                status: 500,
                message: "Internal server error"
            }
        }
    }
     /**
     * Method to login a user
     * 
     * @param email 
     * @param password 
     * @returns {
        *   status: number,
        *   message: string,
        *   accessToken?: string
        * }
    */
    async authenticateUser(email: string, password: string): Promise<any> {
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                return {
                    status: 404,
                    message: "User not found"
                }
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return {
                    status: 400,
                    message: "Invalid Password"
                }
            } else {
                const accessToken = await this.createToken({
                    _id: user._id,
                    email: email,
                    iat: Math.floor(Date.now() / 1000) - 30,
                    permissions: user.subscriptionType
                }, this.EnvService.loadValue("JWT_SECRET"), '4h');
                return {
                    status: 200,
                    accessToken: accessToken,
                    message: "User authenticated"
                }
            }
        } catch (error) {
            console.error(error);
            return {
                status: 500,
                message: "Internal server error"
            }
        }
    }
    async createToken(payload: any, secret: string, expiresIn: string): Promise<string> {
        return jwt.sign(payload, secret, { expiresIn: expiresIn });
    }
}