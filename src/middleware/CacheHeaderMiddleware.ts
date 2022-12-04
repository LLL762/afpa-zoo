import { Request, Response, NextFunction } from "express";

const add = () => (req: Request, res: Response, next: NextFunction) => {

    switch (req.method) {
        case "GET":
            res.set('Cache-control', 'private, max-age=300');
            break;
        default:
            break;
    }
    next();
}


export default { add }