import { Address, Phone, TypeUserRoles } from "../domain"

export type CreateUserRequest = {
    name: string,
    email: string,
    cpf: string,
    password: string,
    role?: TypeUserRoles,
    address?: Address,
    phone?: Phone | Phone[],
    active?: boolean,
    createdAt?: Date
}