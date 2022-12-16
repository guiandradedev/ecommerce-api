import { NextFunction, Request, Response } from "express";

class UserController {

    async create(req: Request, res: Response, next: NextFunction) {}
    async get(req: Request, res: Response, next: NextFunction) {}
    async find(req: Request, res: Response, next: NextFunction) {}
    async put(req: Request, res: Response, next: NextFunction) {}
    async delete(req: Request, res: Response, next: NextFunction) {}

}

export default new UserController()