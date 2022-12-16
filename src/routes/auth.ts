import { Router} from 'express'
import AuthController from '../controller/AuthController'

const routes = Router()

routes.post("/", AuthController.create)
routes.post("/login", AuthController.login)
routes.post("/refresh", AuthController.refresh)//fazer depois

export default routes;