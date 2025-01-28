export interface IBuildingService {
    createBuilding: (email:string, buildingInfo:Building) => any;
    removeBuilding: () => any;
    editBuilding: () => any;
    readBuilding: (email:string) => any;
}
export interface Building {
    name:String;
    address:String;
    city: String;
    postalCode:String;
    buildingType:buildingType;

}
export type buildingType = string;