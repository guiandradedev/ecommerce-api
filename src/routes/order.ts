import { Router} from 'express'

const routes = Router()

import OrderController from '../controller/OrderController'
import { verifyAuthentication } from '../middlewares/AuthMiddleware'

routes.post("/finish", OrderController.finishOrder)

routes.get("/:id", OrderController.find)
routes.get("/", OrderController.get)
routes.post("/", verifyAuthentication, OrderController.create)
routes.put("/:id", verifyAuthentication, OrderController.put)
routes.delete("/:id", verifyAuthentication, OrderController.delete)


export default routes;