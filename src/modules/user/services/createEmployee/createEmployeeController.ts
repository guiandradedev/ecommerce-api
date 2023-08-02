import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError, ErrInvalidParam, ErrServerError } from "@/shared/errors";
import { userResponse } from "@/shared/helpers/response";
import { CreateEmployeeRequest, CreateUserRequest } from "@/modules/user/protocols";
import { CreateEmployeeUseCase } from "./createEmployeeUseCase";

export class CreateUserController {

    //only employees with worksFor role ADMIN can create employees

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, cpf, worksFor }: CreateEmployeeRequest = request.body

        if (!name || !email || !worksFor || !cpf) return response.status(422).json({erros: [new ErrInvalidParam('data')]})

        try {
            const createEmployeeUseCase = container.resolve(CreateEmployeeUseCase)

            const user = await createEmployeeUseCase.execute({
                name, email, cpf, worksFor
            })

            return response.status(201).json({data: "User created! Check your email to receive your password!"});
        } catch (error) {
            console.log(error)
            if(error instanceof AppError) {
                return response.status(error.status).json({ errors: [error] })
            }
            return response.status(500).json({erros: [new ErrServerError()]})
        }
    }
};