import { CreateCategoryController } from '@/modules/product/services/createCategory/createCategoryController';
import { FastifyTypedInstance } from '@/types/fastify.types';

export async function categoryRoutes(app: FastifyTypedInstance) {
    const createCategoryController = new CreateCategoryController()
    app.post('/', createCategoryController.getProperties(), createCategoryController.handle)

    
}
