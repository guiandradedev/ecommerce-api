import { Product } from "@/modules/product/domain";
import { CreateProductRequest } from "@/modules/product/protocols";
import { ErrAlreadyExists, ErrInvalidParam, ErrNotFound } from "@/shared/errors";
import { ICategoryRepository, IProductRepository } from "../../repositories";
import { inject, injectable } from "tsyringe";

/**
 * Use case to create a product
 * 
 * Regras de negócio:
 * - stored should be greater than 0
 * - price should be greater than 0
 * - slug should not exist in the db
 * - category cannot be null and should exists in the db
 * - active should be a boolean
 */

@injectable()
export class CreateProductUseCase {
    constructor(
        @inject('ProductRepository')
        private readonly productRepository: IProductRepository,

        @inject('CategoryRepository')
        private readonly categoryRepository: ICategoryRepository
    ) {}
    async execute({ name, description, slug, price, stored, category, active }: CreateProductRequest): Promise<Product> {
        if(stored <= 0) throw new ErrInvalidParam('stored is less or equal 0')

        if(price <= 0) throw new ErrInvalidParam('price is less or equal 0')

        if(category.length == 0) throw new ErrInvalidParam('Category')

        const categoriesExists = await this.categoryRepository.findByListId(category)
        if(!categoriesExists) throw new ErrNotFound("Categories")

        const productAlreadyExists = await this.productRepository.findBySlug(slug)
        if(productAlreadyExists) throw new ErrAlreadyExists('Product')

        const product = Product.create({
            name,
            description,
            slug,
            price,
            stored,
            category,
            active,
            createdAt: new Date(),
            updatedAt: new Date(),
            sold: 0,
            offer: 0,
            thumbnail: '',
        })

        await this.productRepository.create(product)
        return product
    }
}