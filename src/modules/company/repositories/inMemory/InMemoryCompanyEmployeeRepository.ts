import { CompanyEmployee } from "../../domain/";
import { ICompanyEmployeeRepository } from "../ICompanyEmployeeRepository";

export class InMemoryCompanyEmployeeRepository implements ICompanyEmployeeRepository {
    private readonly companyEmployee: CompanyEmployee[] = []

    async create(data: CompanyEmployee): Promise<void> {
        this.companyEmployee.push(data)
    }
    async findByUserAndCompany(userId: string, companyId: string): Promise<CompanyEmployee> {
        const company = this.companyEmployee.find(company => company.props.companyId == companyId && company.props.employeeId == userId)
        if (!company) return null;
        return company;
    }
}