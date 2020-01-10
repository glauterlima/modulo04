import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import SystemController from './app/controllers/SystemController';
import DemandController from './app/controllers/DemandController';
import CountController from './app/controllers/CountController';
import CompanyController from './app/controllers/CompanyController';
import ContractController from './app/controllers/ContractController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/systems', SystemController.index);
routes.post('/systems', SystemController.store);

routes.get('/companies', CompanyController.index);
routes.post('/companies', CompanyController.store);

routes.get('/demands', DemandController.index);
routes.post('/demands', DemandController.store);

routes.get('/contracts', ContractController.index);
routes.post('/contracts', ContractController.store);

routes.use(authMiddleware); /** só vale para as rotas posteriores */

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);

routes.get('/counts', CountController.index);
routes.post('/counts', CountController.store);
routes.delete('/counts/:id', CountController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
