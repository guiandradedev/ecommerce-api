import { inject, injectable } from "tsyringe";
import { Category } from "@/modules/product/domain";
import { ListCategoriesRequest, ListCategoriesResponse } from "@/modules/product/protocols";
import { ICategoryRepository } from "@/modules/product/repositories";
import { ErrAlreadyExists } from "@/shared/errors";

/**
* Use case to list categories
*
* Business Rules:
* - 
*/

@injectable()
export class CategoryUseCase {
    constructor(
        @inject('CategoryRepository')
        private readonly categoryRepository: ICategoryRepository
    ) { }

    async execute(data: ListCategoriesRequest): Promise<ListCategoriesResponse[]> {
        const categories = await this.categoryRepository.list({})

        return categories
    }
}