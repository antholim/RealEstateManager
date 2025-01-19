import jwt, {JwtPayload} from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import EnvService from "../../services/EnvService";
import { User } from "../../models/User";

async function authenticateToken(req : Request, res : Response, next:NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token || authHeader) return res.status(401).json({ message: "Unauthorized: No token provided" });

    const decoded:JwtPayload|string = jwt.verify(token, EnvService.loadValue("SECRET_KEY"));
    if (!decoded || typeof decoded === "string") {
        return res.status(403).json({ message: "Forbidden: Invalid token" });
    } 
    const user = await User.findOne({ email: decoded.email })
    res.json({ email: decoded.email });
    next();
}