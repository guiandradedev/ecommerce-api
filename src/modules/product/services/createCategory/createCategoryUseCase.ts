import { Category } from "@/modules/product/domain";
import { CreateCategoryRequest } from "@/modules/product/protocols";
import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "@/modules/product/repositories";
import { ErrAlreadyExists } from "@/shared/errors";
import { GenerateSlug } from "@/shared/helpers/generateSlug";

@injectable()
export class CreateCategoryUseCase {
    constructor(
        @inject('CategoryRepository')
        private readonly categoryRepository: ICategoryRepository
    ) {}
    async execute({name, slug}: CreateCategoryRequest): Promise<Category> {
        const verifyExists = await this.categoryRepository.findBySlug(slug)
        if(verifyExists) throw new ErrAlreadyExists('Category')

        const generateSlug = new GenerateSlug()
        slug = generateSlug.generate(slug)

        const category = Category.create({name, slug})
        await this.categoryRepository.create(category)
        return category
    }
}