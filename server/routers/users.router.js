import express from 'express';
import { deleteUsers, getUsers, updateRole, updateUser } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.delete('/', deleteUsers);
userRouter.put('/role', updateRole);
userRouter.put('/:id', updateUser);

export default userRouter;
