import { Entity } from "@/shared/core/entity";

type ProductProps = {
    name: string,
    description: string,
    stored: number,
    sold: number,
    price: number,
    offer: number,
    slug: string,
    active: boolean,
    seller: string, //provider id
    createdAt: Date,
    updatedAt: Date,
    //later images!
}

export class Product extends Entity<ProductProps> {
    private constructor(props: ProductProps, id?: string) {
        super(props, id)
    }

    public static create(props: ProductProps, id?: string) {
        const product = new Product(props, id);

        return product;
    }
}