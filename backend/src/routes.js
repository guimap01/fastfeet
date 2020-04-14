import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import SignatureController from './app/controllers/SignatureController';
import DeliveryManController from './app/controllers/DeliveryManController';
import DeliveryController from './app/controllers/DeliveryController';
import PickupController from './app/controllers/PickupController';
import authMiddleware from './app/middlewares/auth';
import DeliveryManFunctionsController from './app/controllers/DeliveryManFunctionsController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import CancelDeliveryProblemController from './app/controllers/CancelDeliveryProblemController';

const routes = new Router();
const upload = multer(multerConfig);

// Start Session
routes.post('/sessions', SessionController.store);

// Delivery Problems routes
routes.post('/problems/:id', DeliveryProblemController.store);
routes.get('/problems', DeliveryProblemController.index);
routes.get('/problems/:id', DeliveryProblemController.show);

// Pickup Route
routes.put('/pickup', PickupController.update);
routes.get('/pickup/:id', PickupController.index);
routes.get('/pickup/:id/delivery', PickupController.show);

// DeliveryManFunctionsController
routes.get('/deliverymanfunction/:id', DeliveryManFunctionsController.index);
routes.get('/deliverymandelivery/:id', DeliveryManFunctionsController.show);

// Upload of the Signatures print and update the delivery
routes.post('/signatures', upload.single('file'), SignatureController.store);

// Auth Middleware
routes.use(authMiddleware);

// Users routes
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
routes.get('/users', UserController.list);

// Recipient routes
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);
routes.get('/recipients', RecipientController.list);
routes.get('/recipients/:id', RecipientController.list);

// Upload of files routes
routes.post('/files', upload.single('file'), FileController.store);

// DeliveryMan routes
routes.post('/deliveryman', DeliveryManController.store);
routes.put('/deliveryman/:id', DeliveryManController.update);
routes.get('/deliveryman', DeliveryManController.list);
routes.get('/deliveryman/:id', DeliveryManController.show);
routes.delete('/deliveryman', DeliveryManController.delete);

// Cancel Delivery due to problem

routes.put('/canceldelivery/:id', CancelDeliveryProblemController.update);

// Delivery routes
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);
routes.get('/deliveries', DeliveryController.list);
routes.get('/deliveries/:id', DeliveryController.show);

export default routes;
