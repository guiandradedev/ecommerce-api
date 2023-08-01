import { Product } from "@/modules/product/domain";
import { CreateProductRequest } from "@/modules/product/protocols";

export class CreateProductUseCase {
    async execute({ name, description, slug, price, stored, seller, category, active }: CreateProductRequest): Promise<Product> {
        return Product.create({
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
    }
}