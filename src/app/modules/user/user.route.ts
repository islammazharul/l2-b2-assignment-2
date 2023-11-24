import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post("/create-user", userController.createUser)

router.get("/", userController.getAllUser)

router.get("/:userId", userController.getSingleUser)

router.put("/:userId", userController.updateUser)

router.put("/:userId/orders", userController.addOrderCollection)

router.get("/:userId/orders", userController.totalPrice)

router.delete("/:userId", userController.deleteUser)


export const userRout = router;