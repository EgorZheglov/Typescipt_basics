import { Router } from 'express';
import usersService from './user.service';
import restrictResponse from '../../libs/restrict-response';
import { userCreateMW, userUpdateMW } from '../../middlwares/user-middleware';

const router: Router = Router();

router.get('/', async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.status(200).send(users.map(restrictResponse));
});

router.post('/', userCreateMW, async (req, res) => {
  //soon will be using only for admins
  const { name, login, password } = req.body;
  const user = await usersService.createUser({ name, login, password });

  res.status(201).send(restrictResponse(user));
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await usersService.getUserById(id);

  if (user) {
    res.status(200).json(restrictResponse(user));
  } else {
    res.status(404).json('Not found');
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await usersService.deleteUser(id);
  // await taskService.removedUserUpdate(id);

  res.status(204).send('User deleted');
});

router.put('/:id', userUpdateMW, async (req, res) => {
  const id = req.params.id;

  const user = await usersService.updateUser(req.body, id);

  if (user) {
    return res.json(restrictResponse(user));
  } else {
    res.status(404).json('Not found');
  }
});

export default router;