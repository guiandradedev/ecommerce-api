import { CreateProductController } from '@/modules/product/services/createProduct';
import { ListProductController } from '@/modules/product/services/listProducts';
import { FastifyTypedInstance } from '@/types/fastify.types';

export async function productRoutes(app: FastifyTypedInstance) {
    const listProductsController = new ListProductController()
    app.get('/', listProductsController.getProperties(), listProductsController.handle)

    const createProductController = new CreateProductController()
    app.post('/', createProductController.getProperties(), createProductController.handle)
}