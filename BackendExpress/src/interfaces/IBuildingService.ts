export interface IBuildingService {
    createBuilding: (decoded:any, buildingInfo:Building) => any;
    removeBuilding: () => any;
    editBuilding: () => any;
    readBuilding: () => any;
}
export interface Building {
    name:String;
    address:String;
    city: String;
    postalCode:String;
    buildingType:buildingType;

}
export type buildingType = string;