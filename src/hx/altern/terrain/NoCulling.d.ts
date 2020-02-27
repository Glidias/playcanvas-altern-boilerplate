import altern_terrain_ICuller from "./../../altern/terrain/ICuller";

declare namespace altern.terrain {

export class NoCulling {

	constructor();
	cullingInFrustum(culling:any, minX:any, minY:any, minZ:any, maxX:any, maxY:any, maxZ:any):any;


}

}

export default altern.terrain.NoCulling;