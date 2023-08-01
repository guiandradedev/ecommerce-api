import { Code, TypesCode } from "@/modules/user/domain"
import { Code as prismaCode } from "@prisma/client"

const prismaCodeToEntity = (u: prismaCode): Code => {
    const code = Code.create({
        code: u.code,
        createdAt: u.createdAt,
        expiresIn: u.expiresIn,
        active: u.active,
        type: u.type as TypesCode,
        userId: u.userId,

    }, u.id)

    return code
}

export { prismaCodeToEntity }