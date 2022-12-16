import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import UserToken from "../model/UserToken.js";

class RefreshTokenService {
  async execute(refresh_token) {
    console.log('refresh', refresh_token)
    try {
      const { email, sub } = jwt.verify(
        refresh_token,
        process.env.JWT_REFRESH_TOKEN
      );

      const user_id = sub;

      const userToken = await UserToken.findOne({ user_id, refresh_token });

        console.log('user token', userToken)

      if (userToken == null) {
        return new Error("ERR_USER_NOT_FOUND_TOKEN")
      }
      await userToken.delete();

      const new_refresh_token = jwt.sign(
        { email },
        process.env.JWT_REFRESH_TOKEN,
        {
          subject: sub,
          expiresIn: process.env.JWT_EXPIRES_IN_TOKEN,
        }
      );

      const refresh_token_expires_date = dayjs()
        .add(process.env.JWT_EXPIRES_REFRESH_TOKEN_DAYS, "days")
        .toDate();

      const refresh_token_created = await UserToken.create({
        user_id: sub,
        refresh_token: new_refresh_token,
        expires_date: refresh_token_expires_date,
      });

      await refresh_token_created.save();

      const newToken = jwt.sign({}, process.env.JWT_ACCESS_TOKEN, {
        subject: user_id,
        expiresIn: process.env.JWT_EXPIRES_IN_TOKEN,
      });

      return {
        refresh_token: new_refresh_token,
        token: newToken,
      };

    } catch (error) {
      if(error.message == "invalid token") {
        console.log("teste")
      }
      return new Error("token");
    }
  }
}

export { RefreshTokenService };
