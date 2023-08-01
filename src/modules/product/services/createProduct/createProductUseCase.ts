import { Product } from "@/modules/product/domain";
import { CreateProductRequest } from "@/modules/product/protocols";

export class CreateProductUseCase {
    async execute({}: CreateProductRequest): Promise<Product> {
        return null
    }
}