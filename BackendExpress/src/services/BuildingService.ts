import { IEnvService } from "../interfaces/EnvService";
import { buildingType, IBuildingService } from "../interfaces/IBuildingService";
export default class BuildingService implements IBuildingService {
    private EnvService;
    constructor(EnvService: IEnvService) {
        this.EnvService = EnvService;
    }

    createBuilding(buildingType :buildingType) {

    }
    removeBuilding() {

    }
    editBuilding () {

    }
    readBuilding () {

    }
}