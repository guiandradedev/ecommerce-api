import { container } from "tsyringe";

import { AppError, ErrInvalidParam, ErrServerError } from "@/shared/errors";
import { Controller, IController } from "@/types/services.types"
import { FastifyReply, FastifyRequest, FastifySchema, RouteShorthandOptions } from "fastify";
import { validateInput } from "@/shared/utils/validateInput";
import { CreateCategoryRequest } from "@/modules/product/protocols";
import z from "zod";
import { CreateCategoryUseCase } from "./createCategoryUseCase";
import { categoryResponse } from "@/modules/product/helpers";

export class CreateCategoryController implements IController {

    async handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
        try {
            Controller.body(request)
        
            const { name, slug } = request.body as CreateCategoryRequest

            await validateInput({ name, slug }, ['name', 'slug']);

            const createCategoryUseCase = container.resolve(CreateCategoryUseCase)

            const category = await createCategoryUseCase.execute({
                name,
                slug
            })

            return reply.status(201).send({data: categoryResponse(category)})
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
            description: "Create category",
            tags: ["Category"],
            summary: "Create a new category",
            // body: authenticateUserBody,
            response: {
                // 200: successAuthenticateUserResponse,
            },
        };
    }
};