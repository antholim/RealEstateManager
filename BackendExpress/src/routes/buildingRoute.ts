import express from "express"
import BuildingController from '../controllers/buildingController';

const router = express.Router();

router.post("/building", BuildingController.buildingCreateController());

export default router;
