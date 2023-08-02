import { Entity } from "@/shared/core/entity";

type CompanyEmployeeProps = {
    companyId: string,
    employeeId: string,
    role: string
}

export class CompanyEmployee extends Entity<CompanyEmployeeProps> {
    private constructor(props: CompanyEmployeeProps, id?: string) {
        super(props, id)
    }

    public static create(props: CompanyEmployeeProps, id?: string) {
        const companyEmployee = new CompanyEmployee(props, id);

        return companyEmployee;
    }
}