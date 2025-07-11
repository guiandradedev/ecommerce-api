import { prismaClient } from "@/infra/providers/database/prisma";
import { Product } from "@/modules/product/domain";
import { IProductRepository, ListProductParams } from "@/modules/product/repositories";
import { UserToken } from "@/modules/user/domain";
import { prismaUserTokenToEntity } from "@/modules/user/mappers/prisma";


export class PrismaProductRepository implements IProductRepository {
    async create(data: Product): Promise<void> {
        await prismaClient.product.create({ data: { ...data.props, id: data.id } })
    }
    async findBySlug(slug: string): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    async list(params: ListProductParams): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    
}