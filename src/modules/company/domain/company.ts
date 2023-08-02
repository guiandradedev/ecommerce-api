import { Entity } from "@/shared/core/entity";

type CompanyProps = {
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