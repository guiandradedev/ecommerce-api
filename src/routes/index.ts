import { Router} from 'express'

const routes = Router()
import auth from './auth'
// import user from './user'
import product from './product'
import provider from './provider'
import order from './order'
import { verifyAuthentication } from '../middlewares/AuthMiddleware'


routes.use("/auth", auth)
// routes.use("/user", verifyAuthentication, user)
routes.use("/product", product)
routes.use("/provider", provider)
routes.use("/order", verifyAuthentication, order)

routes.get("/", (req, res)=>{
    res.send("teste")
})

export default routes;