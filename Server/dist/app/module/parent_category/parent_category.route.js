"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PCategoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const parent_category_controller_1 = require("./parent_category.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const parent_category_validation_1 = require("./parent_category.validation");
const router = express_1.default.Router();
router.post('/create', (0, validateRequest_1.default)(parent_category_validation_1.ParnetCategoryValidation.createParentCategoryValidationSchema), parent_category_controller_1.PCategoryController.createParentCategory);
router.get('/', parent_category_controller_1.PCategoryController.getAllParentCategory);
exports.PCategoryRoute = router;
