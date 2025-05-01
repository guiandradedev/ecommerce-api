import { container } from "tsyringe";

import { AppError, ErrInvalidParam, ErrServerError } from "@/shared/errors";
import { IController } from "@/types/services.types"
import { FastifyReply, FastifyRequest, FastifySchema, RouteShorthandOptions } from "fastify";
import { validateInput } from "@/shared/utils/validateInput";
import { CreateProductRequest } from "../../protocols";
import z from "zod";

export class createProductController implements IController {

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

    public getProperties(): RouteShorthandOptions {
        return {
            schema: this.getSchema(),
        };
    }

    private getSchema(): FastifySchema {
        const authenticateUserBody = z.object({
            email: z.string().email(),
            password: z.string().min(6),
        });
    
        return {
            description: "Authenticate a user",
            tags: ["Auth"],
            summary: "Authenticates a user and returns a token",
            // body: authenticateUserBody,
            response: {
                // 200: successAuthenticateUserResponse,
            },
        };
    }
};