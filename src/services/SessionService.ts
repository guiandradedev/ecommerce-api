import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import { prismaClient } from "../config/prisma";

class CreateSession {
  async execute(email: string, _id: string): Promise<Tokens> {
    try {
      _id = _id.toString();

      const token = jwt.sign({}, process.env.JWT_ACCESS_TOKEN, {
        subject: _id,
        expiresIn: process.env.JWT_EXPIRES_IN_TOKEN,
      });

      const refresh_token = jwt.sign({ email }, process.env.JWT_REFRESH_TOKEN, {
        subject: _id,
        expiresIn: process.env.JWT_EXPIRES_IN_REFRESH_TOKEN,
      });

      const refresh_token_expires_date = dayjs()
        .add(process.env.JWT_EXPIRES_REFRESH_TOKEN_DAYS, "days")
        .toDate();

      const refresh_token_created = await prismaClient.userToken.create({
        data: {
          refresh_token,
          expires_data: refresh_token_expires_date,
          user_id: _id
        }
      })

      return { token, refresh_token };

    } catch (error) {
      console.log(error)
      throw new Error("token")
    }
  }
}

export { CreateSession };
