import { Product } from "../domain";

export interface IProductRepository {
    create(data: Product): Promise<void>
}