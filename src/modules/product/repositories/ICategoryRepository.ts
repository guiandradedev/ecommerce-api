import { Category } from "../domain"

export interface ListCategoryFilters {
    // active?: boolean,
}

export interface ICategoryRepository {
    findById(id: string): Promise<Category>
    findBySlug(slug: string): Promise<Category>
    create(data: Category): Promise<void>
    findByListId(ids: string[]): Promise<Category[]>
    list(props: ListCategoryFilters): Promise<Category[]>
}