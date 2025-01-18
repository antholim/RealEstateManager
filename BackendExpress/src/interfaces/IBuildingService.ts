export interface IBuildingService {
    createBuilding: (any:any) => any;
    removeBuilding: () => any;
    editBuilding: () => any;
    readBuilding: () => any;
}
export interface Building {
    address: {
        type: String,
    },
    city: {
        type:String,
    },
    postalCode: {
        type:String,
    },
}
export type buildingType = string;