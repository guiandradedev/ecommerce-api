import { Code } from "@/modules/user/domain";
import { FindByCode, FindByCodeAndUserId, FindCodeByUserId, ICodeRepository } from "../ICodeRepository";

export class InMemoryCodeRepository implements ICodeRepository {
    public codes: Code[] = []

    async create(data: Code): Promise<void> {
        this.codes.push(data)
    }

    async findByCodeAndUserId({code, userId, type}: FindByCodeAndUserId): Promise<Code> {
        const data = this.codes.find((c)=>{
            const isTypeMatch = type ? c.props.type === type : true;
            return c.props.code == code && c.props.userId == userId && isTypeMatch
        })

        if(!data) return null;

        return data;
    }

    async findByCode({code, type}: FindByCode): Promise<Code> {
        const data = this.codes.find((c)=>{
            const isTypeMatch = type ? c.props.type === type : true;
            return c.props.code == code && isTypeMatch
        })

        if(!data) return null;

        return data;
    }

    async findByUserId({userId, type}: FindCodeByUserId): Promise<Code> {
        const data = this.codes.find((c)=>{
            const isTypeMatch = type ? c.props.type === type : true;
            return c.props.userId == userId && isTypeMatch
        })

        if(!data) return null;

        return data;
    }

    async changeCodeStatus(id: string): Promise<boolean> {
        const data = this.codes.find(c=>c.id==id)
        if(!data) return null;
        const status = !data.props.active
        data.props.active = status
        return status;
    }
}
