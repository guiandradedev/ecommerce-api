import { ResponseAdapter } from "@/shared/helpers"
import { Category } from "../domain"

type CategoryAttributes = {
    name: string,
    slug: string
}

export interface ProductResponseAdapter<CategoryAttributes> extends ResponseAdapter<CategoryAttributes>{}

export const categoryResponse = (category: Category): ProductResponseAdapter<CategoryAttributes> => {
    return {
        id: category.id,
        attributes: {
            name: category.props.name,
            slug: category.props.slug
        },
        links: {
            self: "/api/category/"+category.id
        }
    }
}