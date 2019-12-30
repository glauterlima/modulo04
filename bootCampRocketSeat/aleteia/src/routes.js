import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import SystemController from './app/controllers/SystemController';
import DemandController from './app/controllers/DemandController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
routes.post('/systems', SystemController.store);
routes.post('/demands', DemandController.store);

routes.use(authMiddleware); /** só vale para as rotas posteriores */

routes.put('/users', UserController.update);
routes.put('/demands', DemandController.update);

routes.get('/providers', ProviderController.index);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
