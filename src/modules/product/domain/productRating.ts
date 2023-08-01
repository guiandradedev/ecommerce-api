import { Entity } from "@/shared/core/entity";

type ProductRatingProps = {
    review: string
    rating: number, //0 - 5
    productId: string
    userId: string,
    //photos later!
}

export class ProductRating extends Entity<ProductRatingProps> {
    private constructor(props: ProductRatingProps, id?: string) {
        super(props, id)
    }

    public static create(props: ProductRatingProps, id?: string) {
        const productRating = new ProductRating(props, id);

        return productRating;
    }
}