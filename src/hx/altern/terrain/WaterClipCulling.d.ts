import altern_terrain_ICuller from "./../../altern/terrain/ICuller";

declare namespace altern.terrain {

export class WaterClipCulling {

	constructor(terrainLOD:any);
	terrainLOD:any;
	cullingInFrustum(culling:any, minX:any, minY:any, minZ:any, maxX:any, maxY:any, maxZ:any):any;


}

}

export default altern.terrain.WaterClipCulling;