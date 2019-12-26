import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import { SessionController, StudentController } from './app/controllers';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/students', StudentController.store);

routes.put('/students/:id', StudentController.update);

export default routes;
