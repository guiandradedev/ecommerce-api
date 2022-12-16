import { AddressProvider, PhoneProvider, Provider, User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { prismaClient } from "../config/prisma";
import {
  errCreateProvider,
  errInvalidData,
  errProviderAlreadyExists,
} from "../utils/errors";
import { ProviderReturn } from "../utils/returns";

class ProviderController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { cnpj, description, name, slug }: Provider = req.body;
    if (!name || !description || !name || !slug) {
      return res
        .status(errInvalidData.status)
        .json({ errors: [errInvalidData] });
    }

    const { city, country, number, state, street, zipcode }: AddressProvider =
      req.body;
    if (!city || !country || !number || !state || !street || !zipcode) {
      return res
        .status(errInvalidData.status)
        .json({ errors: [errInvalidData] });
    }

    const { ddd }: PhoneProvider = req.body;
    const numberProvider = req.body.phone_number;
    if (!ddd || !numberProvider) {
      return res
        .status(errInvalidData.status)
        .json({ errors: [errInvalidData] });
    }

    try {
      const verifyExists = await prismaClient.provider.findFirst({
        where: {
          OR: [
            {cnpj},
            {slug}
          ]
        },
      });
      if (verifyExists) {
        return res
          .status(errProviderAlreadyExists.status)
          .json({ errors: [errProviderAlreadyExists] });
      }

      const user: User = res.locals.user

      const provider = await prismaClient.provider.create({
        data: {
            cnpj,
            description,
            name,
            address: {
                create: {
                    city,
                    country,
                    number,
                    state,
                    street,
                    zipcode
                }
            },
            phones: {
                create:{
                    ddd,
                    number: numberProvider
                }
            },
            owner_id: user.id,
            slug
        }
      })

      return res.status(201).json({data: ProviderReturn(provider)})
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
      } else {
        return res
          .status(errCreateProvider.status)
          .json({ errors: [errCreateProvider] });
      }
    }
  }
  async get(req: Request, res: Response, next: NextFunction) {}
  async find(req: Request, res: Response, next: NextFunction) {}
  async put(req: Request, res: Response, next: NextFunction) {}
  async delete(req: Request, res: Response, next: NextFunction) {}
}

export default new ProviderController();
