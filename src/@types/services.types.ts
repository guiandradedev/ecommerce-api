import { ErrInvalidRequest } from '@/shared/errors/ErrInvalidRequest';
import { FastifyRequest, FastifyReply, RouteShorthandOptions } from 'fastify';

export interface IController {
    handle(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>;
    getProperties(): RouteShorthandOptions;
}

export interface UseCaseRequest {}
export interface UseCaseResponse {}

export interface IUseCase {
    execute(data: UseCaseRequest): Promise<UseCaseResponse>;
}

export class Controller {
    static body<T>(request: FastifyRequest, params?: Array<T>): void {
        if(!request.body) {
            throw new ErrInvalidRequest("body")
        }
    }
    static query<T>(request: FastifyRequest, params?: Array<T>): void {

    }
}