import { Router} from 'express'

const routes = Router()

import ProductController from '../controller/ProductController'
import { verifyAuthentication } from '../middlewares/AuthMiddleware'
import { verifyUserProvider } from '../middlewares/VerifyUser'

routes.get("/:id", ProductController.find) //ok
routes.get("/", ProductController.get) //ok
routes.post("/", verifyAuthentication, ProductController.create) //ok
routes.put("/:id", verifyAuthentication, verifyUserProvider, ProductController.put) //depois
routes.delete("/:id", verifyAuthentication, verifyUserProvider, ProductController.delete) //depois

export default routes;