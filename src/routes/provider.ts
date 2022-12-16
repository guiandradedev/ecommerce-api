import { Router} from 'express'
import ProviderController from '../controller/ProviderController';
import { verifyAuthentication } from '../middlewares/AuthMiddleware';
import { verifyUserAdmin } from '../middlewares/VerifyUser';

const routes = Router()

routes.get("/:id", ProviderController.find)
routes.get("/", verifyAuthentication, verifyUserAdmin, ProviderController.get)
routes.post("/", verifyAuthentication, ProviderController.create)
routes.put("/:id", verifyAuthentication, ProviderController.put)
routes.delete("/:id", verifyAuthentication, ProviderController.delete)

export default routes;