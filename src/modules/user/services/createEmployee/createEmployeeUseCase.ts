import { User } from "@/modules/user/domain";
import { CreateEmployeeRequest } from "@/modules/user/protocols";
import { inject, injectable } from "tsyringe";
import { IHashAdapter } from "../../adapters/HashAdapter";
import { IUserRepository } from "../../repositories";
import { ErrAlreadyExists, ErrNotFound } from "@/shared/errors";
import { ICompanyRepository } from "@/modules/company/repositories";
import { GeneratePassword } from "../../utils/GeneratePassword";
import { IMailAdapter } from "@/shared/adapters/MailAdapter";
import { SendUserMail } from "@/shared/helpers/mail";

@injectable()
export class CreateEmployeeUseCase {
    constructor(
        @inject('UserRepository')
        private readonly userRepository: IUserRepository,
        @inject('HashAdapter')
        private readonly hashAdapter: IHashAdapter,

        @inject('CompanyRepository')
        private readonly companyRepository: ICompanyRepository,

        @inject('MailAdapter')
        private readonly mailAdapter: IMailAdapter,
    ) { }

    async execute({ name, email, cpf, active, address, role, createdAt, phone, worksFor }: CreateEmployeeRequest): Promise<User> {
        const userMailExists = await this.userRepository.findByEmail(email)
        if (userMailExists) throw new ErrAlreadyExists('User')

        const userCpfExists = await this.userRepository.findByCpf(cpf)
        if (userCpfExists) throw new ErrAlreadyExists('User')

        const companyExists = await this.companyRepository.findById(worksFor.id)
        if (!companyExists) throw new ErrNotFound('Company')

        const generatePassword = new GeneratePassword()
        const { password } = generatePassword.execute({ size: 8, type: 'string' })
        const passwordHash = await this.hashAdapter.hash(password)

        const user = User.create({
            name,
            active: active ?? false,
            cpf,
            createdAt: createdAt ?? new Date(),
            email,
            password: passwordHash,
            role: role ?? "USER",
            address,
            phone,
            worksFor: [worksFor]
        })

        await this.userRepository.create(user)

        const sendUserMail = new SendUserMail(this.mailAdapter)
        await sendUserMail.createEmployeePassword({ to: email, password })

        return user
    }
}