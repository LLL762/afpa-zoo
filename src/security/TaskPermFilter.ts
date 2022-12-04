import { Request, Response, NextFunction } from "express";
import { IJwtPayload } from "../jwt/JwtUtil";
import AuthorizationUtil from "./AuthorizationUtil";


const getAllPerm = {
    type: "READ",
    level: "private",
    resource: "TASK",
    scope: "RESOURCE",
}

const getAll = (req: Request, res: Response, next: NextFunction) => {
    AuthorizationUtil.checkToken(req, next);
    const payload = req.user as IJwtPayload;





}




export default { getAll }


