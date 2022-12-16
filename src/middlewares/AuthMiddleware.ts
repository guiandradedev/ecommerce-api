import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import {
  errApplication,
  errGetUser,
  errNeedsToken,
  errTokenInvalid,
} from "../utils/errors";
import { prismaClient } from "../config/prisma";

const verifyAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken =
    req.headers.authorization || req.body.token || req.query.token;

  if (!authToken)
    return res.status(errNeedsToken.status).json({ errors: [errNeedsToken] });
  const [, token] = authToken.split(" ");
  if (!token)
    return res.status(errNeedsToken.status).json({ errors: [errNeedsToken] });

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    const id = payload.sub as string;
    const user = await prismaClient.user.findUnique({
      where: {
        id
      },
    });
    if (!user)
      return res.status(errGetUser.status).send({ errors: [errGetUser] });

    res.locals.authentication = payload;
    res.locals.user = user;

    next();
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      if (error.message === "jwt expired") {
        return res
          .status(errTokenInvalid.status)
          .json({ errors: [errTokenInvalid] });
      } else if (error.message == "jwt must be provided") {
        return res
          .status(errNeedsToken.status)
          .json({ errors: [errNeedsToken] });
      } else {
        return res
          .status(errApplication.status)
          .json({ errors: [errApplication] });
      }
    } else {
      return res
        .status(errApplication.status)
        .json({ errors: [errApplication] });
    }
  }
};

export { verifyAuthentication };
