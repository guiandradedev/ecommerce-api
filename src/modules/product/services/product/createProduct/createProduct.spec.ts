import 'reflect-metadata'

import { describe, expect, it } from "vitest";
import { CreateProductUseCase } from "./createProductUseCase";
import { Category, Product } from "@/modules/product/domain";
import { ErrAlreadyExists, ErrInvalidParam, ErrNotFound } from "@/shared/errors";
import { InMemoryCategoryRepository, InMemoryProductRepository } from '../../repositories/inMemory';
import { CreateCategoryUseCase } from '../createCategory/createCategoryUseCase';

/*
 * Regras de negócio:
 *
 * - stored deve ser maior que 0
 * - price deve ser maior que 0
 * - slug nao pode existir no db
 * - seller deve ser um provider existente
 * - category nao pode ser nulo
 */

describe('Create Product', () => {
    const makeSut = async () => {
        const productRepository = new InMemoryProductRepository()
        const categoryRepository = new InMemoryCategoryRepository()
        const sut = new CreateProductUseCase(productRepository, categoryRepository)
        const sutCategory = new CreateCategoryUseCase(categoryRepository)

        const category1 = await sutCategory.execute({
            name: "Category 1",
            slug: "category-1"
        })
        const category2 = await sutCategory.execute({
            name: "Category 1",
            slug: "category-2"
        })

        return { sut, category1, category2 }
    }
    it('should create an product', async () => {
        const { sut, category1, category2 } = await makeSut()

        const product = await sut.execute({
            name: "valid_name",
            description: "valid description",
            category: [category1.id, category2.id],
            active: false,
            price: 5,
            slug: "valid_slug",
            stored: 5
        })

        expect(product).toBeInstanceOf(Product)
        expect(product.props.category).toEqual([category1.id, category2.id])
        expect(product.props.name).toEqual("valid_name")
        expect(product.props.description).toEqual("valid description")
        expect(product.props.active).toEqual(false)
        expect(product.props.price).toEqual(5)
        expect(product.props.slug).toEqual("valid_slug")
        expect(product.props.stored).toEqual(5)
        expect(product.props.sold).toEqual(0)
        expect(product.props.offer).toEqual(0)
        expect(product.props.thumbnail).toEqual('')
        expect(product.props.category).toHaveLength(2)
    })
    it('should throw an error if stored is less or equal 0', async () => {
        const { sut, category1 } = await makeSut()

        const product = sut.execute({
            name: "valid_name",
            description: "valid description",
            category: [category1.id],
            active: false,
            price: 5,
            slug: "valid_slug",
            stored: 0
        })

        const product2 = sut.execute({
            name: "valid_name",
            description: "valid description",
            category: [category1.id],
            active: false,
            price: 5,
            slug: "valid_slug2",
            stored: -1
        })

        await expect(product).rejects.toBeInstanceOf(ErrInvalidParam)
        await expect(product2).rejects.toBeInstanceOf(ErrInvalidParam)
        await expect(product).rejects.toThrow('stored is less or equal 0')
        await expect(product2).rejects.toThrow('stored is less or equal 0')
        await expect(product).rejects.toThrow(ErrInvalidParam)
        await expect(product2).rejects.toThrow(ErrInvalidParam)
    })
    it('should throw an error if price is less or equal 0', async () => {
        const { sut, category1 } = await makeSut()

        const product = sut.execute({
            name: "valid_name",
            description: "valid description",
            category: [category1.id],
            active: false,
            price: 0,
            slug: "valid_slug",
            stored: 5
        })

        const product2 = sut.execute({
            name: "valid_name",
            description: "valid description",
            category: [category1.id],
            active: false,
            price: -1,
            slug: "valid_slug2",
            stored: 5
        })

        await expect(product).rejects.toBeInstanceOf(ErrInvalidParam)
        await expect(product2).rejects.toBeInstanceOf(ErrInvalidParam)
    })
    it('should throw an error if slug already exists', async () => {
        const { sut, category1 } = await makeSut()

        await sut.execute({
            name: "valid_name",
            description: "valid description",
            category: [category1.id],
            active: false,
            price: 5,
            slug: "valid_slug",
            stored: 5
        })

        const product = sut.execute({
            name: "valid_name",
            description: "valid description",
            category: [category1.id],
            active: false,
            price: 5,
            slug: "valid_slug",
            stored: 5
        })

        await expect(product).rejects.toBeInstanceOf(ErrAlreadyExists)
    })
    it('should throw an error if category is empty', async () => { 
        const { sut, } = await makeSut()

        const product = sut.execute({
            name: "valid_name",
            description: "valid description",
            category: [],
            active: false,
            price: 5,
            slug: "valid_slug",
            stored: 5
        })

        await expect(product).rejects.toBeInstanceOf(ErrInvalidParam)
    })
    it('should throw an error if category does not exists', async () => { 
        const { sut } = await makeSut()

        const product = sut.execute({
            name: "valid_name",
            description: "valid description",
            category: ["invalid_category"],
            active: false,
            price: 5,
            slug: "valid_slug",
            stored: 5
        })

        await expect(product).rejects.toBeInstanceOf(ErrNotFound)
    })
})