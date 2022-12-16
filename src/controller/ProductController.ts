import { Product, ProductCategory } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { prismaClient } from "../config/prisma";
import { errCreateProduct, errGetProduct, errInvalidData, errProductAlreadyExists, errProductNotFound } from "../utils/errors";
import { ProductReturn } from "../utils/returns";

type ProductRequest = {
    search: string,
    take: number,
    skip: number
}

class ProductController {

    async create(req: Request, res: Response, next: NextFunction) {
        let { name, description, price, stored, offer, category_id, slug, sold, provider_id }: Product = req.body

        if (!name || !description || !price || !stored || !slug || !provider_id || !category_id) {
            return res
                .status(errInvalidData.status)
                .json({ errors: [errInvalidData] });
        }

        slug = slug.split(" ").join("-")

        try {
            const verifyExists = await prismaClient.product.findUnique({
                where: {
                  slug
                },
              });
              if (verifyExists) {
                return res
                  .status(errProductAlreadyExists.status)
                  .json({ errors: [errProductAlreadyExists] });
              }

            const product = await prismaClient.product.create({
                data: {
                    name,
                    description,
                    price,
                    stored,
                    offer,
                    category_id,
                    slug,
                    sold,
                    provider_id,
                }
            })

            return res.status(201).json({data: ProductReturn(product)})

        } catch (error) {
            return res.status(errCreateProduct.status).json({errors: [errCreateProduct]})
        }
    }
    async get(req: Request, res: Response, next: NextFunction) {

        // const {search, skip, take}: ProductRequest = req.query
        const {search, skip, take} = req.query

        try {
            const product = await prismaClient.product.findMany({
                where: {
                    OR: {
                        name: {
                            contains: String(search),
                            mode: 'insensitive'
                        },
                        slug: {
                            contains: String(search),
                            mode: 'insensitive'
                        }
                    },
                    active: true,
                    stored: {
                        gte: 0
                    }
                },
                include: {
                    photos: {
                        select: {
                            url: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'asc'
                },
                take: take ? Number(take) : undefined,
                skip: skip ? Number(skip) : undefined
            })

            if(product.length == 0) {
                return res.status(errProductNotFound.status).json({errors: [errProductNotFound]})
            }

            return res.status(200).json({data: product.map(ProductReturn)})
        } catch (error) {
            console.log(error)
            return res.status(errGetProduct.status).json({errors: [errGetProduct]})
        }
    }
    async find(req: Request, res: Response, next: NextFunction) {

        const id: string = req.params.id

        try {
            const product = await prismaClient.product.findUnique({
                where: {
                    id
                },
                include: {
                    photos: {
                        select: {
                            url: true
                        }
                    }
                },
            })

            if(product == null || !product) {
                return res.status(errProductNotFound.status).json({errors: [errProductNotFound]})
            }

            return res.status(200).json({data: ProductReturn(product)})
        } catch (error) {
            console.log(error)
            return res.status(errGetProduct.status).json({errors: [errGetProduct]})
        }

     }
    async put(req: Request, res: Response, next: NextFunction) { }
    async delete(req: Request, res: Response, next: NextFunction) { }

}

export default new ProductController()