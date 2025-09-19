import express from 'express';
import { ServiceController } from './service.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidation } from './service.validation';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post(
  '/create',
  auth(UserRole.SERVICE_PROVIDER),
  validateRequest(ServiceValidation.createServiceSchemaValidation),
  ServiceController.createService
);
router.get('/', ServiceController.getAllServices);

router.get('/:id', ServiceController.getServiceById);

export const ServiceRoute = router;
