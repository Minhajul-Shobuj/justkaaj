import express from 'express';
import { ServiceCategoryController } from './serviceCategoty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceCategoryValidation } from './serviceCategory.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(
    ServiceCategoryValidation.createServiceCategorySchemaValidation
  ),
  ServiceCategoryController.createServiceCategory
);

export const ServiceCategoryRoute = router;
