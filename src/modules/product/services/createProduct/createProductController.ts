import { container } from "tsyringe";

import { AppError, ErrInvalidParam, ErrServerError } from "@/shared/errors";
import { IController } from "@/types/services.types"
import { FastifyReply, FastifyRequest, RouteShorthandOptions } from "fastify";
import { validateInput } from "@/shared/utils/validateInput";
import { CreateProductRequest } from "../../protocols";

export class createProductController implements IController{

    async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        const { name } = request.body as CreateProductRequest

        try {
            await validateInput({ name }, ['name', 'email', 'password']);

            // const createUserUseCase = container.resolve(CreateUserUseCase)

            // const user = await createUserUseCase.execute({
            //     name,
            //     email,
            //     password
            // })

            // return reply.status(201).send({data: userResponse(user)});
            return ;
        } catch (error) {
            console.log(error)
            if(error instanceof AppError) {
                return reply.status(error.status).send({ errors: [error] })
            }
            return reply.status(500).send({erros: [new ErrServerError()]})
        }
    }

    // getSchema(): RouteShorthandOptions {
    //     return {
    //         description: 'Fetch user information',
    //         tags: ['User'],
    //         summary: 'Get user data',
    //         response: {
    //             200: {
    //                 type: 'object',
    //                 properties: {
    //                     status: { type: 'string' },
    //                     message: { type: 'string' },
    //                     data: {
    //                         type: 'object',
    //                         properties: {
    //                             id: { type: 'number' },
    //                             name: { type: 'string' },
    //                             email: { type: 'string' },
    //                         },
    //                     },
    //                 },
    //             },
    //         },
    //     };
    // }
};