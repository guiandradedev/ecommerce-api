import { Entity } from "@/shared/core/entity";
import { Address, Phone } from "@prisma/client";

type CompanyProps = {
    cnpj: string,
    name: string,
    description: string,
    slug: string,
    active: boolean,
    address?: Address | Address[],
    phone?: Phone | Phone[],
    //later photos
}

export class Company extends Entity<CompanyProps> {
    private constructor(props: CompanyProps, id?: string) {
        super(props, id)
    }

    public static create(props: CompanyProps, id?: string) {
        const company = new Company(props, id);

        return company;
    }
}