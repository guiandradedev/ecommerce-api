import { container } from "tsyringe";

import { IAuthTokenRepository, ICodeRepository, IUserRepository } from "@/modules/repositories";

import { PrismaAuthTokenRepository } from "@/modules/infra/repositories/prisma/PrismaAuthTokenRepository";
import { PrismaCodeRepository } from "@/modules/infra/repositories/prisma/PrismaCodeRepository";
import { PrismaUserRepository } from "@/modules/infra/repositories/prisma/PrismaUserRepository";

import { BcryptHashAdapter, IHashAdapter } from "@/modules/adapters/HashAdapter";
import { IMessageBrokerAdapter, KafkaAdapter } from "@/shared/adapters/MessageBrokerAdapter";
import { ISecurityAdapter } from "@/modules/adapters/SecurityAdapter/ISecurityAdapter";
import { JwtSecurityAdapter } from "@/modules/adapters/SecurityAdapter/implementations/JwtSecurityAdapter";

container.registerSingleton<IUserRepository>(
    "UserRepository",
    PrismaUserRepository
)

container.registerInstance<IHashAdapter>(
    "HashAdapter",
    new BcryptHashAdapter(12)
)

container.registerSingleton<IMessageBrokerAdapter>(
    "MessageBrokerAdapter",
    KafkaAdapter
)

container.registerSingleton<ICodeRepository>(
    "CodeRepository",
    PrismaCodeRepository
)

container.registerSingleton<IAuthTokenRepository>(
    "AuthTokenRepository",
    PrismaAuthTokenRepository
)

container.registerSingleton<ISecurityAdapter>(
    "SecurityAdapter",
    JwtSecurityAdapter
)