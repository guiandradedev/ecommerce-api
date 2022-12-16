import { OrderItem, Order, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../config/prisma";
import {
  errApplication,
  errInvalidData,
  errInvalidOrderItem,
  errPaymentInstallments,
  errPaymentNotFound,
  errProductNotFound,
} from "../utils/errors";

import * as mercadopago from "mercadopago";
mercadopago.configurations.setAccessToken(process.env.MERCADOPAGO_TOKEN);

class OrderController {
  async create(req: Request, res: Response, next: NextFunction) {
    // const { payment_type_id, installments }: Order = req.body;

    // if (!payment_type_id || !installments) {
    //   if (installments == 0) {
    //     return res
    //       .status(errPaymentInstallments.status)
    //       .json({ errors: [errPaymentInstallments] });
    //   }
    //   return res
    //     .status(errInvalidData.status)
    //     .json({ errors: [errInvalidData] });
    // }

    const product: Omit<OrderItem, "order_id"> = req.body.product;

    if (!product || !product.amount || !product.product_id) {
      return res
        .status(errInvalidOrderItem.status)
        .json({ errors: [errInvalidOrderItem] });
    }

    try {
      //verifica se existe o produto
      const productData = await prismaClient.product.findUnique({
        where: {
          id: product.product_id,
        },
      });
      if (!productData) {
        return res
          .status(errProductNotFound.status)
          .json({ errors: [errProductNotFound] });
      }

      // //verifica se existe o tipo de pagamento e as parcelas
      // const payment = await prismaClient.paymentType.findUnique({
      //   where: {
      //     id: payment_type_id,
      //   },
      // });

      // if (!payment) {
      //   return res
      //     .status(errPaymentNotFound.status)
      //     .json({ errors: [errPaymentNotFound] });
      // }

      // if (installments <= 0 || installments > payment.installments) {
      //   return res
      //     .status(errPaymentInstallments.status)
      //     .json({ errors: [errPaymentInstallments] });
      // }

      const discount = (productData.offer / 100) * productData.price;
      const total = productData.price - discount;

      const user: User = res.locals.user;

      const order = await prismaClient.order.create({
        data: {
          // installments,
          total,
          user_id: user.id,
          // payment_type_id,
          // finished: false,
          items: {
            create: {
              amount: product.amount,
              price: total,
              product_id: productData.id,
            },
          },
        },
      });
      console.log(order);
      res.send("teste");
    } catch (error) {}
  }
  async get(req: Request, res: Response, next: NextFunction) {}
  async find(req: Request, res: Response, next: NextFunction) {}
  async put(req: Request, res: Response, next: NextFunction) {}
  async delete(req: Request, res: Response, next: NextFunction) {}

  async addProduct(req: Request, res: Response, next: NextFunction) {}

  async finishOrder(req: Request, res: Response, next: NextFunction) {
    const { order_id } = req.body;

    try {
      // mercadopago.payment
      //   .save(req.body)
      //   .then(function (response) {
      //     const { status, status_detail, id } = response.body;
      //     res.status(response.status).json({ status, status_detail, id });
      //   })
      //   .catch(function (error) {
      //     console.error(error);
      //   });
    } catch (error) {
      return res
        .status(errApplication.status)
        .json({ errors: [errApplication] });
    }
  }
}

export default new OrderController();
