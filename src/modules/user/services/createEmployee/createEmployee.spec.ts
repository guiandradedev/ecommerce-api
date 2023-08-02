import 'dotenv/config'
import { describe, it, expect, vitest } from 'vitest'
import 'reflect-metadata'
import { InMemoryUserRepository } from '@/modules/user/repositories/inMemory'
import { User } from '@/modules/user/domain'
import { ErrAlreadyExists, ErrNotFound, } from '@/shared/errors'
import { InMemoryHashAdapter } from '@/modules/user/adapters/HashAdapter'
import { InMemoryMailAdapter } from '@/shared/adapters/MailAdapter'
import { CreateEmployeeUseCase } from './createEmployeeUseCase'
import { InMemoryCompanyEmployeeRepository, InMemoryCompanyRepository } from '@/modules/company/repositories/inMemory'
import { Company } from '@/modules/company/domain'

describe('Create User', () => {

    const makeSut = async () => {
        const userRepository = new InMemoryUserRepository()
        const companyRepository = new InMemoryCompanyRepository()
        const companyEmployeeRepository = new InMemoryCompanyEmployeeRepository()
        const hashAdapter = new InMemoryHashAdapter()
        const mailAdapter = new InMemoryMailAdapter()
        const sut = new CreateEmployeeUseCase(userRepository, hashAdapter, companyRepository, companyEmployeeRepository, mailAdapter)

        const company = Company.create({active: true, cnpj: "", description: "", name: "", slug: ""})
        vitest.spyOn(companyRepository, 'findById').mockResolvedValueOnce(company);

        return { userRepository, sut, companyRepository }
    }

    it('should create an user', async () => {
        const { sut } = await makeSut()

        const user = await sut.execute({
            name: "valid name",
            email: "valid_email@mail.com",
            cpf: "valid_cpf",
            worksFor: {
                id: "valid_company",
                role: "User"
            }
        })

        expect(user).toBeInstanceOf(User)
    })

    it('should throw an error if company does not exists', async () => {
        const { sut, companyRepository } = await makeSut()

        vitest.spyOn(companyRepository, 'findById').mockReturnValueOnce(Promise.resolve(null))

        const user = sut.execute({
            name: "valid name",
            email: "valid_email@mail.com",
            cpf: "valid_cpf",
            worksFor: {
                id: "valid_company",
                role: "User"
            }
        })

        expect(user).rejects.toBeInstanceOf(ErrNotFound)
    })

    it('should not create another user (email)', async () => {
        const { sut } = await makeSut()

        await sut.execute({
            name: "valid name",
            email: "valid_email@mail.com",
            cpf: "valid_cpf",
            worksFor: {
                id: "valid_company",
                role: "User"
            }
        })

        const user = sut.execute({
            name: "valid name",
            email: "valid_email@mail.com",
            cpf: "valid_cpf",
            worksFor: {
                id: "valid_company",
                role: "User"
            }
        })

        expect(user).rejects.toBeInstanceOf(ErrAlreadyExists)
    })

    it('should not create another user (cpf)', async () => {
        const { sut } = await makeSut()

        await sut.execute({
            name: "valid name",
            email: "valid_email@mail.com",
            cpf: "valid_cpf",
            worksFor: {
                id: "valid_company",
                role: "User"
            }
        })

        const user = sut.execute({
            name: "valid name",
            email: "valid_email2@mail.com",
            cpf: "valid_cpf",
            worksFor: {
                id: "valid_company",
                role: "User"
            }
        })
        expect(user).rejects.toBeInstanceOf(ErrAlreadyExists)
    })
})