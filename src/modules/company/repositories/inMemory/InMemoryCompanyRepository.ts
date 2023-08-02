import { Company } from "../../domain/company";
import { ICompanyRepository } from "../ICompanyRepository";

export class InMemoryCompanyRepository implements ICompanyRepository {

    async findById(id: string): Promise<Company> {
        return Company.create({})
    }
}