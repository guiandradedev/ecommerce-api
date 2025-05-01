import { Entity } from "@/shared/core/entity";

type CategoryProps = {
    name: string
    slug: string
    //photos later!
}

export class Category extends Entity<CategoryProps> {
    private constructor(props: CategoryProps, id?: string) {
        super(props, id)
    }

    public static create(props: CategoryProps, id?: string) {
        const category = new Category(props, id);

        return category;
    }
}