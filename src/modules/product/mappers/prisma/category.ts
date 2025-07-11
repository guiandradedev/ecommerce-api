import { Category as prismaCategory} from "@prisma/client"
import { Category } from "@/modules/product/domain"

const prismaCategoryToEntity = (c: prismaCategory): Category => {
    const category = Category.create({
        name: c.name,
        slug: c.slug,
    }, c.id)

    return category
}

export { prismaCategoryToEntity }