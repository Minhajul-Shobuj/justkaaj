"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoute = void 0;
const express_1 = __importDefault(require("express"));
const service_controller_1 = require("./service.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const service_validation_1 = require("./service.validation");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/create', (0, auth_1.default)(client_1.UserRole.SERVICE_PROVIDER), (0, validateRequest_1.default)(service_validation_1.ServiceValidation.createServiceSchemaValidation), service_controller_1.ServiceController.createService);
router.get('/', service_controller_1.ServiceController.getAllServices);
router.get('/:id', service_controller_1.ServiceController.getServiceById);
exports.ServiceRoute = router;
