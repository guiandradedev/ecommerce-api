export interface CreateProductRequest {
    name: string,
    description: string,
    stored: number,
    price: number,
    slug: string,
    active: boolean,
    seller: string,
    category: string[]
}