import { Product } from "@/modules/product/domain";
import { CreateProductRequest } from "@/modules/product/protocols";
import { ErrAlreadyExists, ErrInvalidParam, ErrNotFound } from "@/shared/errors";
import { ICategoryRepository, IProductRepository } from "../../repositories";
import { inject, injectable } from "tsyringe";
import { ListProductsRequest } from "../../protocols/listProductsDTO";

/**
 * Use case to list all products
 * 
 * Regras de negócio:
 * - if user does not input any params, should return all products
 * - price param should respect the params
 */

@injectable()
export class ListProductsUseCase {
    constructor(
        @inject('ProductRepository')
        private readonly productRepository: IProductRepository,

        @inject('CategoryRepository')
        private readonly categoryRepository: ICategoryRepository
    ) {}
    async execute({ query, price, active, category, rating, offer }: ListProductsRequest): Promise<Product> {
        
        return null;
    }
}