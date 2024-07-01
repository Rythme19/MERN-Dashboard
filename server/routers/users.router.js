import express from 'express';
import { deleteUsers, getUsers, updateRole, updateUser, register, login, getOne } from "../controllers/user.controller.js";
import authmiddleware from "../middleware/authMiddleware.js";

const userRouter = express.Router();

// Public routes
userRouter.post('/register', register);
userRouter.post('/login', login);

// Protected routes
userRouter.get('/', getUsers);
userRouter.delete('/',  deleteUsers);
userRouter.put('/role', updateRole);
userRouter.put('/:id', updateUser);
userRouter.post('/getOne',authmiddleware, getOne);

export default userRouter;
