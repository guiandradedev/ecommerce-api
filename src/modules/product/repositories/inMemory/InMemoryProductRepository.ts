import { Product } from "@/modules/product/domain";
import { IProductRepository } from "../IProductRepository";

export class InMemoryProductRepository implements IProductRepository {
    private readonly products: Product[] = []
    
    async create(data: Product): Promise<void> {
        this.products.push(data)
    }
}