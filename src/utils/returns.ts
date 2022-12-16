import { Order, Product, Provider, User } from "@prisma/client"

export const userSuccessReturn = (user: User) => {
    const data = {
        type: "user",
        id: user.id,
        attributes: {
            name: user.name,
            email: user.email,
            permissions: user.permission,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        },
        links: {
            self: "/api/user/" + user.id
        },
    }
    return data
}

export const userSuccessReturnToken = (user: User, tokens: Tokens) => {
    const data = {
        type: "user",
        id: user.id,
        attributes: {
            name: user.name,
            email: user.email,
            permissions: user.permission,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        },
        links: {
            self: "/api/user/" + user.id
        },
        tokens: {
            token: tokens.token,
            refresh_token: tokens.refresh_token
        }
    }
    return data
}

//Provider
export const ProviderReturn = (provider: Provider) => {
    const data = {
        type: "provider",
        id: provider.id,
        attributes: {
            name: provider.name,
            cnpj: provider.cnpj,
            description: provider.description,
            photo: provider.photo,
            slug: provider.slug,
            active: provider.active
        },
        links: {
            self: "/api/provider/" + provider.id
        },
    }
    return data
}

//Produdct
export const ProductReturn = (product: Product) => {
    console.log(product)
    const data = {
        type: "product",
        id: product.id,
        attributes: {
            name: product.name,
            description: product.description,
            stored: product.stored,
            sold: product.sold,
            price: product.price,
            offer: product.offer,
            provider: product.provider_id,
            category: product.category_id,
            slug: product.slug,
            active: product.active,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            photos: product.photo
        },
        links: {
            self: "/api/product/" + product.id
        },
    }
    return data
}

//Produdct
export const OrderReturn = (order: Order) => {
    const data = {
        type: "order",
        id: order.id,
        attributes: {
            total: order.total,
            status: order.status,
            finished: order.finished,
            installments: order.installments,
            payment_type: order.payment_type_id,
            user: order.user_id
        },
        links: {
            self: "/api/order/" + order.id
        },
    }
    return data
}