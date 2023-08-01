import { Code, TypesCode } from '@/modules/user/domain'

export type FindByCodeAndUserId = {
    code: string,
    userId: string,
    type?: TypesCode
}

export type FindByCode = {
    code: string,
    type?: TypesCode
}

export type FindCodeByUserId = {
    userId: string,
    type?: TypesCode
}

export interface ICodeRepository {
    create(code: Code): Promise<void>
    findByCodeAndUserId(data: FindByCodeAndUserId): Promise<Code>
    findByCode(data: FindByCode): Promise<Code>
    findByUserId(data: FindCodeByUserId): Promise<Code>
    changeCodeStatus(id: string): Promise<boolean>
}