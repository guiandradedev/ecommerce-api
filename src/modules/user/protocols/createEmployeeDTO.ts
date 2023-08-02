import { Address, Phone, TypeUserRoles, TypeUserWorksFor } from "../domain";

export interface CreateEmployeeRequest {
    name: string,
    email: string,
    cpf: string,
    role?: TypeUserRoles,
    address?: Address,
    phone?: Phone | Phone[],
    active?: boolean,
    worksFor: TypeUserWorksFor
    createdAt?: Date
}