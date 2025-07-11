import { Category } from "@/modules/product/domain";
import { CreateCategoryRequest } from "@/modules/product/protocols";
import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "@/modules/product/repositories";
import { ErrAlreadyExists } from "@/shared/errors";
import { SanitizeString } from "@/shared/helpers";

/**
 * Use case to create a category
 * 
 * Regras de negócio:
 * - slug should not exist in the db
 * - name should not be null
 * - slug should not be null
 */

@injectable()
export class CreateCategoryUseCase {
    constructor(
        @inject('CategoryRepository')
        private readonly categoryRepository: ICategoryRepository
    ) {}
    async execute({name, slug}: CreateCategoryRequest): Promise<Category> {
        const verifyExists = await this.categoryRepository.findBySlug(slug)
        if(verifyExists) throw new ErrAlreadyExists('Category')

        const generateSlug = new SanitizeString()
        slug = generateSlug.sanitize(slug)

        const category = Category.create({name, slug})
        await this.categoryRepository.create(category)
        return category
    }
}