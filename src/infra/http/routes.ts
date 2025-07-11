import { productRoutes } from '@/modules/product/infra/http/routes';
import { categoryRoutes } from '@/modules/product/infra/http/routes';
import { authRoutes } from '@/modules/user/infra/http/routes';
import { FastifyTypedInstance } from '@/types/fastify.types';

export async function routes(app: FastifyTypedInstance) {
    // app.get('/users', {
    //     schema: {
    //         tags: ['users'],
    //         description: "asdsadas"
    //     }
    // }, () => {
    //     return { message: 'User list' };
    // });

    // app.get('/auth/social-login', (request) => {
    //     console.log(request.body)
    //     return { status: 'ok' };
    // });

    app.register(authRoutes, { prefix: '/auth' });
    app.register(productRoutes, { prefix: '/product' });
    app.register(categoryRoutes, { prefix: '/category' });
}
