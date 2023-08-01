import { prismaClient } from "@/infra/providers/database/prisma";
import { Code } from "@/modules/user/domain";
import { prismaCodeToEntity } from "@/modules/user/mappers/prisma";
import { FindByCode, FindByCodeAndUserId, FindCodeByUserId, ICodeRepository } from "@/modules/user/repositories";

export class PrismaCodeRepository implements ICodeRepository {
    async create(data: Code): Promise<void> {
        await prismaClient.code.create({ data: { ...data.props, id: data.id } })
    }

    async findByCodeAndUserId({code, userId, type}: FindByCodeAndUserId): Promise<Code> {
        const data = await prismaClient.code.findFirst({
            where: {
                code,
                userId,
                type: type ?? {contains: ''}
            }
        })
        
        if(!data) return null;

        return prismaCodeToEntity(data);
    }

    async findByCode({code, type}: FindByCode): Promise<Code> {
        const data = await prismaClient.code.findFirst({
            where: {
                code,
                type: type ?? {contains: ''}
            }
        })
        
        if(!data) return null;

        return prismaCodeToEntity(data);
    }

    async findByUserId({userId, type}: FindCodeByUserId): Promise<Code> {
        const data = await prismaClient.code.findFirst({
            where: {
                userId,
                type: type ?? {contains: ''}
            }
        })
        
        if(!data) return null;

        return prismaCodeToEntity(data);
    }

    async changeCodeStatus(id: string): Promise<boolean> {
        const code = await prismaClient.code.findFirst({where: {id}})
        if(!code) return null;

        const status = !code.active

        await prismaClient.code.update({
            where: {id},
            data: {
                active: status
            }
        })

        return status
    }

}
