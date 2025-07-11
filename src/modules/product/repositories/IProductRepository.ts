import { Product } from "../domain";

export type ComparisonOperator = '>' | '>=' | '<' | '<=' | '==' | '!=';

export interface ListProductParams {
    query?: string; // name or description
    price: number;
    price_condition: ComparisonOperator,
    offer?: number; // percentage
    active?: boolean;
    category?: string[];
    rating?: number;
}

export interface IProductRepository {
    create(data: Product): Promise<void>
    findBySlug(slug: string): Promise<Product>
    list(params: ListProductParams): Promise<Product[]>
}