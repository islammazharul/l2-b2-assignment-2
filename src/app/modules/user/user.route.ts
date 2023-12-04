import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/', userController.createUser);

router.get('/', userController.getAllUser);

router.get('/:userId', userController.getSingleUser);

router.get('/:userId/orders', userController.singleUserOrder);

router.get('/:userId/orders/total-price', userController.totalPrice);

router.put('/:userId', userController.updateUser);

router.put('/:userId/orders', userController.addOrderCollection);

router.delete('/:userId', userController.deleteUser);

export const userRout = router;
