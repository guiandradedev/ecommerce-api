import { Request, Response } from "express";

export class CreateProductController {
    async handle (request: Request, response: Response): Promise<Response> {
        return response.status(201)
    }
}