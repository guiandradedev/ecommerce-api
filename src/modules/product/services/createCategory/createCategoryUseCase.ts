import { Category } from "@/modules/product/domain";
import { CreateCategoryRequest } from "@/modules/product/protocols";

export class CreateCategoryUseCase {
    async execute({}: CreateCategoryRequest): Promise<Category> {
        return null
    }
}