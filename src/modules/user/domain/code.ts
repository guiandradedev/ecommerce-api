import { Entity } from "@/shared/core/entity";

export type TypesCode = 'ACTIVATE_ACCOUNT' | 'FORGOT_PASSWORD'

export type CodeProps = {
    userId: string,
    code: string,
    active: boolean,
    expiresIn: Date,
    createdAt: Date,
    type: TypesCode
}

export class Code extends Entity<CodeProps> {
    private constructor(props: CodeProps, id?: string) {
        super(props, id)
    }

    public static create(props: CodeProps, id?: string) {
        const code = new Code(props, id);

        return code;
    }
}