import 'reflect-metadata'

import { describe, expect, it } from "vitest";
import { CreateProductUseCase } from "./createProductUseCase";
import { Category, Product } from "@/modules/product/domain";
import { ErrAlreadyExists, ErrInvalidParam, ErrNotFound } from "@/shared/errors";
import { InMemoryCategoryRepository, InMemoryProductRepository } from '../../repositories/inMemory';
import { InMemoryCompanyRepository } from '@/modules/company/repositories/inMemory';
import { Company } from '@/modules/company/domain';

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
        const companyRepository = new InMemoryCompanyRepository()
        const categoryRepository = new InMemoryCategoryRepository()
        const sut = new CreateProductUseCase(productRepository, companyRepository, categoryRepository)

        const company = Company.create({
            active: true,
            cnpj: "",
            description: "",
            name: "",
            slug: ""
        })
        await companyRepository.create(company)

        const category1 = Category.create({
            name: "category1",
            slug: ""
        })

        await categoryRepository.create(category1)

        return { sut, company, category1 }
    }
    it('should create an product', async () => {
        const { sut, company, category1 } = await makeSut()

        const product = await sut.execute({
            name: "valid_name",
            description: "valid description",
            category: [category1.id],
            active: false,
            price: 5,
            seller: company.id,
            slug: "valid_slug",
            stored: 5
        })

        expect(product).toBeInstanceOf(Product)
    })
    it('should throw an error if stored is less or equal 0', async () => {
        const { sut, company, category1 } = await makeSut()

        const product = sut.execute({
            name: "valid_name",
            description: "valid description",
            category: [category1.id],
            active: false,
            price: 5,
            seller: company.id,
            slug: "valid_slug",
            stored: 0
        })

        const product2 = sut.execute({
            name: "valid_name",
            description: "valid description",
            category: [category1.id],
            active: false,
            price: 5,
            seller: company.id,
            slug: "valid_slug2",
            stored: -1
        })

        expect(product).rejects.toBeInstanceOf(ErrInvalidParam)
        expect(product2).rejects.toBeInstanceOf(ErrInvalidParam)
    })
    it('should throw an error if price is less or equal 0', async () => {
        const { sut, company, category1 } = await makeSut()

        const product = sut.execute({
            name: "valid_name",
            description: "valid description",
            category: [category1.id],
            active: false,
            price: 0,
            seller: company.id,
            slug: "valid_slug",
            stored: 5
        })

        const product2 = sut.execute({
            name: "valid_name",
            description: "valid description",
            category: [category1.id],
            active: false,
            price: -1,
            seller: company.id,
            slug: "valid_slug2",
            stored: 5
        })

        expect(product).rejects.toBeInstanceOf(ErrInvalidParam)
        expect(product2).rejects.toBeInstanceOf(ErrInvalidParam)
    })
    it('should throw an error if slug already exists', async () => {
        const { sut, company, category1 } = await makeSut()

        await sut.execute({
            name: "valid_name",
            description: "valid description",
            category: [category1.id],
            active: false,
            price: 5,
            seller: company.id,
            slug: "valid_slug",
            stored: 5
        })

        const product = sut.execute({
            name: "valid_name",
            description: "valid description",
            category: [category1.id],
            active: false,
            price: 5,
            seller: company.id,
            slug: "valid_slug",
            stored: 5
        })

        expect(product).rejects.toBeInstanceOf(ErrAlreadyExists)
    })
    it('should throw an error if seller does not exists', async () => { 
        const { sut, category1 } = await makeSut()

        const product = sut.execute({
            name: "valid_name",
            description: "valid description",
            category: [category1.id],
            active: false,
            price: 5,
            seller: 'fake_id',
            slug: "valid_slug",
            stored: 5
        })

        expect(product).rejects.toBeInstanceOf(ErrNotFound)
    })
    it('should throw an error if category is empty', async () => { 
        const { sut, company, } = await makeSut()

        const product = sut.execute({
            name: "valid_name",
            description: "valid description",
            category: [],
            active: false,
            price: 5,
            seller: company.id,
            slug: "valid_slug",
            stored: 5
        })

        expect(product).rejects.toBeInstanceOf(ErrInvalidParam)
    })
    it('should throw an error if category does not exists', async () => { 
        const { sut, company, category1 } = await makeSut()

        const product = sut.execute({
            name: "valid_name",
            description: "valid description",
            category: ["invalid_category"],
            active: false,
            price: 5,
            seller: company.id,
            slug: "valid_slug",
            stored: 5
        })

        expect(product).rejects.toBeInstanceOf(ErrNotFound)
    })
})