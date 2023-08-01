import { Request, Response } from "express";

export class CreateCategoryController {
    async handle (request: Request, response: Response): Promise<Response> {
        return response.status(201)
    }
}