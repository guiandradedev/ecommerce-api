import { Category } from "../../domain";
import { ICategoryRepository } from "../ICategoryRepository";

export class InMemoryCategoryRepository implements ICategoryRepository {
    private readonly categories: Category[] = []
    async findById(id: string): Promise<Category> {
        const category = this.categories.find(category => category.id == id)
        if (!category) return null;
        return category;
    }

    async findBySlug(slug: string): Promise<Category> {
        const category = this.categories.find(category => category.props.slug == slug)
        if (!category) return null;
        return category;
    }
    async create(data: Category): Promise<void> {
        this.categories.push(data)
    }

    async findByListId(ids: string[]): Promise<Category[]> {
        const categories = this.categories.filter(category => ids.includes(category.id));
        if (categories.length == 0) return null;
        return categories;
    }
}