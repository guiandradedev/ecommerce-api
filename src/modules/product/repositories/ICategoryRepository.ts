import { Category } from "../domain"

export interface ICategoryRepository {
    findById(id: string): Promise<Category>
    create(data: Category): Promise<void>
    findByListId(ids: string[]): Promise<Category[]>
}