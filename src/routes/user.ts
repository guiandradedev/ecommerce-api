import { Router} from 'express'

const routes = Router()

routes.get("/", (req, res)=>{
    res.send("usuario")
})

export default routes;