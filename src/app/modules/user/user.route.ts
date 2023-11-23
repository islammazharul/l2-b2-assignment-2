import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post("/create-user", userController.createUser)

router.get("/", userController.getAllUser)

router.get("/:userId", userController.getSingleUser)

router.put("/:userId", userController.updateUser)

router.delete("/:userId", userController.deleteUser)


export const userRout = router;