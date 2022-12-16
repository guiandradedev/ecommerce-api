import { Request, Response, NextFunction } from "express";
import { promisify } from 'util';
import fs      from 'fs';
const unlink = promisify(fs.unlink);
import { errActionsLikeSomeoneElse, errApplication, errUnauthorized } from '../utils/errors';
import { User } from "@prisma/client";
import { prismaClient } from "../config/prisma";

// const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
//     //verificar se o user que esta sendo modificado é o mesmo da requisicao
//     const user: User = res.locals.user;
//     const {id} = req.params

//     if(permissionModel.value >= permissions) {
//         next()
//     } else if(id !== user.id) {
//         return res.status(errActionsLikeSomeoneElse.status).json({errors: [errActionsLikeSomeoneElse]})
//     } else {
//         next()
//     }

// }

const verifyUserSeller = async (req: Request, res: Response, next: NextFunction) => {
    //verificar se o user que esta sendo modificado é o mesmo da requisicao
    const user: User = res.locals.user;

    if(user.permission == "SELLER") {
        next()
    } else {
        return res.status(errUnauthorized.status).json({errors: [errUnauthorized]})
    }

}

const verifyUserAdmin = async (req: Request, res: Response, next: NextFunction) =>{ 
    const user: User = res.locals.user;

    if(user.permission == "SELLER") {
        next()
    } else {
        return res.status(errUnauthorized.status).json({errors: [errUnauthorized]})
    }
}

const verifyUserProvider = async (req: Request, res: Response, next: NextFunction) =>{ 
    const user: User = res.locals.user;

    if(user.permission == "PROVIDER") {
        next()
    } else {
        return res.status(errUnauthorized.status).json({errors: [errUnauthorized]})
    }
}


const verifyUserPrime = async (req: Request, res: Response, next: NextFunction) =>{ 
    const user: User = res.locals.user;

    if(user.permission == "PRIME") {
        next()
    } else {
        return res.status(errUnauthorized.status).json({errors: [errUnauthorized]})
    }
}

export {verifyUserAdmin, verifyUserProvider, verifyUserPrime, verifyUserSeller }