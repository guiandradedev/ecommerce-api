import { Company } from "../../domain/company";
import { ICompanyRepository } from "../ICompanyRepository";

export class InMemoryCompanyRepository implements ICompanyRepository {
    private readonly companies: Company[] = []

    async create(data: Company): Promise<void> {
        this.companies.push(data)
    }
    async findById(id: string): Promise<Company> {
        const company = this.companies.find(company => company.id == id)
        if (!company) return null;
        return company;
    }
}