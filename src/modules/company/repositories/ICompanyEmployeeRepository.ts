import { CompanyEmployee } from "../domain/";

export interface ICompanyEmployeeRepository {
    findByUserAndCompany(userId: string, companyId: string): Promise<CompanyEmployee>
    create(data: CompanyEmployee): Promise<void>
}