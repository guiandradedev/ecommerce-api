import { Product } from "@/modules/product/domain";
import { CreateProductRequest } from "@/modules/product/protocols";
import { ErrAlreadyExists, ErrInvalidParam, ErrNotFound } from "@/shared/errors";
import { ICategoryRepository, IProductRepository } from "../../repositories";
import { inject, injectable } from "tsyringe";
import { ICompanyRepository } from "@/modules/company/repositories";

@injectable()
export class CreateProductUseCase {
    constructor(
        @inject('ProductRepository')
        private readonly productRepository: IProductRepository,

        @inject('CompanyRepository')
        private readonly companyRepository: ICompanyRepository,

        @inject('CategoryRepository')
        private readonly categoryRepository: ICategoryRepository
    ) {}
    async execute({ name, description, slug, price, stored, seller, category, active }: CreateProductRequest): Promise<Product> {
        if(stored <= 0) throw new ErrInvalidParam('stored is less or equal 0')

        if(price <= 0) throw new ErrInvalidParam('price is less or equal 0')

        if(category.length == 0) throw new ErrInvalidParam('Category')

        const categoriesExists = await this.categoryRepository.findByListId(category)
        if(!categoriesExists) throw new ErrNotFound("Categories")

        const productAlreadyExists = await this.productRepository.findBySlug(slug)
        if(productAlreadyExists) throw new ErrAlreadyExists('Product')

        const verifyCompany = await this.companyRepository.findById(seller)
        if(!verifyCompany) throw new ErrNotFound('Company')

        const product = Product.create({
            name,
            description,
            slug,
            price,
            stored,
            seller,
            category,
            active,
            createdAt: new Date(),
            updatedAt: new Date(),
            sold: 0,
            offer: 0
        })

        await this.productRepository.create(product)
        return product
    }
}