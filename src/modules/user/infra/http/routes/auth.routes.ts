import { ActivateUserController } from '@/modules/user/services/activateUser/activateUserController';
import { AuthenticateUserController } from '@/modules/user/services/authenticateUser/authenticateUserController'
import { CreateUserController } from '@/modules/user/services/createUser/createUserController'
import { ForgotPasswordController } from '@/modules/user/services/forgotPassword';
import { ResetPasswordController } from '@/modules/user/services/resetPassword';
import { SocialAuthController } from '@/modules/user/services/socialAuth/socialAuthController';
import { FastifyTypedInstance } from '@/types/fastify.types';

export async function authRoutes(app: FastifyTypedInstance) {
    const createUserController = new CreateUserController()
    app.post('/', createUserController.getProperties(), createUserController.handle)

    const authenticateUserController = new AuthenticateUserController()
    app.post('/login', authenticateUserController.getProperties(), authenticateUserController.handle)
    app.post('/activate', new ActivateUserController().handle)
    app.post('/forgot-password', new ForgotPasswordController().handle)
    app.post('/reset-password', new ResetPasswordController().handle)

    app.post("/social-login", new SocialAuthController().handle);

}
