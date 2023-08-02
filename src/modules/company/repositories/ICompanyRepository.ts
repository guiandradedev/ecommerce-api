import { Company } from "../domain/company";

export interface ICompanyRepository {
    findById(id: string): Promise<Company>
}