import 'reflect-metadata'
import { InMemoryHashAdapter } from '@/modules/user/adapters/HashAdapter';
import { InMemoryCodeRepository, InMemoryUserRepository } from '@/modules/user/repositories/inMemory';

import { describe, expect, it, vitest } from "vitest";
import { CreateUserUseCase } from '../createUser/createUserUseCase';
import { ActivateUserUseCase } from './activateUserUseCase';
import { Code } from '@/modules/user/domain';
import { ErrAlreadyActive, ErrInvalidParam, ErrNotFound } from '@/shared/errors';
import { GenerateUserCode } from '@/modules/user/utils/GenerateUserCode';
import { ErrExpired } from '@/shared/errors/ErrExpired';
import { InMemoryMailAdapter } from '@/shared/adapters/MailAdapter';

describe("ActivateUserCode", () => {
    const makeSut = async () => {
        const userRepository = new InMemoryUserRepository()
        const codeRepository = new InMemoryCodeRepository()
        const hashAdapter = new InMemoryHashAdapter()
        const mailAdapter = new InMemoryMailAdapter()
        const userAdapter = new CreateUserUseCase(userRepository, codeRepository, hashAdapter, mailAdapter)

        const user = await userAdapter.execute({
            name: "Flaamer",
            email: "teste@teste.com",
            password: "teste123",
            cpf: "855.031.300-90"
        })

        const code = await codeRepository.findByUserId({userId: user.id, type: 'ACTIVATE_ACCOUNT'})

        const sut = new ActivateUserUseCase(userRepository, codeRepository, mailAdapter)

        return { userRepository,
            codeRepository,
            hashAdapter,
            code,
            sut,
            user,
            mailAdapter,
            userAdapter }
    }
    it('should activate an user if code is valid', async () => {
        const { sut, user, code, userRepository } = await makeSut();

        const activateUser = await sut.execute({
            userId: user.id,
            code: code.props.code
        })

        expect(activateUser).toBeInstanceOf(Code)
        
        const validateUser = await userRepository.findById(activateUser.props.userId)
        expect(validateUser.props.active).toBe(true)
    })

    it('should throw an error if user does not exists', async () => {
        const { sut, code } = await makeSut();

        const activateCode = sut.execute({
            userId: 'fake_user_id',
            code: code.props.code
        })

        expect(activateCode).rejects.toBeInstanceOf(ErrNotFound)
    })

    it('should throw an error if user code not exists', async () => {
        const { sut, user, code } = await makeSut();

        const activateCode = sut.execute({
            userId: user.id,
            code: "fake_code"
        })

        expect(activateCode).rejects.toBeInstanceOf(ErrInvalidParam)
    })

    it('should throw an error if code expired', async () => {
        const userRepository = new InMemoryUserRepository()
        const codeRepository = new InMemoryCodeRepository()
        const hashAdapter = new InMemoryHashAdapter()
        const mailAdapter = new InMemoryMailAdapter()
        const userAdapter = new CreateUserUseCase(userRepository, codeRepository, hashAdapter, mailAdapter)

        const generateActivateCode = vitest.spyOn(GenerateUserCode.prototype, 'execute')
        const date = new Date()
        date.setDate(date.getDate() - 3)
        generateActivateCode.mockImplementationOnce(() => { return { code: '', expiresIn: date } });

        const user = await userAdapter.execute({
            name: "Flaamer",
            email: "teste@teste.com",
            password: "teste123",
            cpf: "855.031.300-90"
        })

        const code = await codeRepository.findByUserId({userId: user.id, type: 'ACTIVATE_ACCOUNT'})

        const sut = new ActivateUserUseCase(userRepository, codeRepository, mailAdapter)

        const activateCode = sut.execute({
            userId: user.id,
            code: code.props.code
        })

        expect(activateCode).rejects.toBeInstanceOf(ErrExpired)

    })

    it('should throw an error if user already active', async () => {
        const { sut, userAdapter } = await makeSut();
        const user = await userAdapter.execute({
            name: "Flaamer",
            email: "teste2@teste.com",
            password: "teste123",
            active: true,
            cpf: "624.751.890-02"
        })

        const activateUser = sut.execute({
            userId: user.id,
            code: 'fake_code'
        })

        expect(activateUser).rejects.toBeInstanceOf(ErrAlreadyActive)

    })

})