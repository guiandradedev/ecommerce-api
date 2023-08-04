import 'reflect-metadata'
import { describe, expect, it } from "vitest";
import { CreateCategoryUseCase } from "./createCategoryUseCase";
import { InMemoryCategoryRepository } from "@/modules/product/repositories/inMemory";
import { Category } from "@/modules/product/domain";
import { ErrAlreadyExists } from '@/shared/errors';

describe('Create Category', () =>{ 
    const makeSut = async () => {
        const categoryRepository = new InMemoryCategoryRepository()
        const sut = new CreateCategoryUseCase(categoryRepository)
        return {sut, categoryRepository}
    }
    it('should create an category', async () =>{ 
        const {sut} = await makeSut()

        const category = await sut.execute({
            name: 'category',
            slug: "category"
        })

        expect(category).toBeInstanceOf(Category)
    })

    it('should throw an error if category already exists', async () => {
        const {sut} = await makeSut()

        await sut.execute({
            name: 'category',
            slug: "category"
        })

        const category = sut.execute({
            name: 'category',
            slug: "category"
        })

        expect(category).rejects.toBeInstanceOf(ErrAlreadyExists)
    })
})