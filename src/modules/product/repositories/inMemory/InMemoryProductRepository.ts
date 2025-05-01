import { Product } from "@/modules/product/domain";
import { IProductRepository } from "../IProductRepository";

export class InMemoryProductRepository implements IProductRepository {
    private readonly products: Product[] = []
    
    async create(data: Product): Promise<void> {
        this.products.push(data)
    }

    async findBySlug(slug: string): Promise<Product> {
        const product = this.products.find(product => product.props.slug == slug)
        if (!product) return null;
        return product;
    }
}