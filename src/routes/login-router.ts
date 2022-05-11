import { NextFunction, Request, Response, Router } from 'express';
import to from 'await-to-js';
import encrypt from '../../libs/encrypt';
import { NewUser } from '../../types';
import userService from '../users/user.service';
import restrictResponse from '../../libs/restrict-response';
import { userLoginMW } from '../../middlwares/user-middleware';
const login = Router();

login.post(
  '/login',
  userLoginMW,
  async (req: Request, res: Response, next: NextFunction) => {
    const { login, password } = req.body;

    const [err, result] = await to(
      userService.loginUser(login, encrypt(password))
    );

    if (err) {
      res.send(err);
    }

    return res.status(200).send({ access_token: result });
  }
);

export default login;