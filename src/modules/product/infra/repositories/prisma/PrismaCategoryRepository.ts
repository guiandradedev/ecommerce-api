import { prismaClient } from "@/infra/providers/database/prisma";
import { Category, Product } from "@/modules/product/domain";
import { prismaCategoryToEntity } from "@/modules/product/mappers";
import { ICategoryRepository, IProductRepository, ListCategoryFilters, ListProductParams } from "@/modules/product/repositories";
import { UserToken } from "@/modules/user/domain";
import { prismaUserTokenToEntity } from "@/modules/user/mappers/prisma";


export class PrismaCategoryRepository implements ICategoryRepository {
    async findById(id: string): Promise<Category> {
        const data = await prismaClient.category.findFirst({
            where: {
                id,
            }
        })
        
        if(!data) return null;

        return prismaCategoryToEntity(data)
    }
    async findBySlug(slug: string): Promise<Category> {
        const data = await prismaClient.category.findFirst({
            where: {
                slug,
            }
        })
        
        if(!data) return null;

        return prismaCategoryToEntity(data)
    }
    async create(data: Category): Promise<void> {
        await prismaClient.category.create({ data: { ...data.props, id: data.id } })
    }
    async findByListId(ids: string[]): Promise<Category[]> {
        const data = await prismaClient.category.findMany({
            where: {
                id: {
                    in: ids
                }
            }
        })
        
        if(!data) return [];

        return data.map(category => prismaCategoryToEntity(category))
    }

    async list(props: ListCategoryFilters): Promise<Category[]> {
        const data = await prismaClient.category.findMany({
            // where: {}
        })
        
        if(!data) return [];

        return data.map(category => prismaCategoryToEntity(category))
    }
}