import {
  errCreateToken,
  errCreateUser,
  errInvalidData,
  errLogIn,
  errUserAlreadyExists,
  errUserIncorrect,
} from "../utils/errors";
// import User from '../model/User.js'
import bcrypt from "bcrypt";
export const salt = async () => await bcrypt.genSalt(12);

import { NextFunction, Request, Response } from "express";

import { CreateSession } from "../services/SessionService";
import { userSuccessReturnToken } from "../utils/returns";
import { prismaClient } from "../config/prisma";
import { AddressUser, User, PhoneUser } from "@prisma/client";

class AuthController {
  async create(req: Request, res: Response, next: NextFunction) {
    let { name, email, password }: User = req.body;

    if (!name || !email) {
      return res
        .status(errInvalidData.status)
        .json({ errors: [errInvalidData] });
    }

    let { city, country, number, state, street, zipcode }: AddressUser =
      req.body;

    if (!city || !country || !number || !state || !street || !zipcode) {
      return res
        .status(errInvalidData.status)
        .json({ errors: [errInvalidData] });
    }

    let { ddd, type }: PhoneUser = req.body;

    let numberUser = req.body.phone_number;

    if (!ddd || !type || !numberUser) {
      return res
        .status(errInvalidData.status)
        .json({ errors: [errInvalidData] });
    }

    try {
      const userExists = await prismaClient.user.findUnique({
        where: {
          email,
        },
      });

      if (userExists)
        return res
          .status(errUserAlreadyExists.status)
          .json({ errors: [errUserAlreadyExists] });

      if (password) {
        // create a password hash (bcrypt)
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        password = passwordHash;
      }

      //create user
      const user = await prismaClient.user.create({
        data: {
          name,
          email,
          password,
          address_user: {
            create: {
              city,
              country,
              number,
              state,
              street,
              zipcode,
            },
          },
          phone_user: {
            create: {
              ddd,
              number: numberUser,
              type,
            },
          },
        },
      });

      if (!user) {
        return res.status(401).json({ errors: "teste" });
      }

      //create tokens
      const session = new CreateSession();
      const token = await session.execute(email, user.id);

      //return success
      return res
        .status(200)
        .json({ data: userSuccessReturnToken(user, token) });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        if (error.message == "token") {
          return res
            .status(errCreateToken.status)
            .json({ errors: [errCreateToken] });
        } else {
          return res
            .status(errCreateUser.status)
            .json({ errors: [errCreateUser] });
        }
      } else {
        return res
          .status(errCreateUser.status)
          .json({ errors: [errCreateUser] });
      }
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(errInvalidData.status)
        .json({ errors: [errInvalidData] });
    }
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          email,
        },
      });

      // const user = await User.findOne({ where: { email_user: email } });
      if (!user)
        return res
          .status(errUserIncorrect.status)
          .json({ errors: [errUserIncorrect] });
      //usa a lib bcrypt e verifica se a senha da requisição ao ser criptografada bate com a senha salva no mongo, caso contrario retorna que o email/senha ta incorreto
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword)
        return res
          .status(errUserIncorrect.status)
          .json({ errors: [errUserIncorrect] });
      //create tokens
      const session = new CreateSession();
      const token = await session.execute(email, user.id);
      //return success
      return res
        .status(200)
        .json({ data: userSuccessReturnToken(user, token) });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        if (error.message == "token") {
          return res
            .status(errCreateToken.status)
            .json({ errors: [errCreateToken] });
        } else {
          return res.status(errLogIn.status).json({ errors: [errLogIn] });
        }
      } else {
        return res.status(errLogIn.status).json({ errors: [errLogIn] });
      }
    }
  }
  async refresh(req: Request, res: Response, next: NextFunction) {}
}

export default new AuthController();
