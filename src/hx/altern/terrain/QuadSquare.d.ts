import altern_terrain_QuadCornerData from "./../../altern/terrain/QuadCornerData";
import js__$Boot_HaxeError from "./../../js/_Boot/HaxeError";
import altern_terrain_QuadSquareChunk from "./../../altern/terrain/QuadSquareChunk";

declare namespace altern.terrain {

export class QuadSquare {

	constructor(pcd:any);
	Child:any;
	
	
	MinY:any;
	MaxY:any;
	destroy():any;
	SetupCornerData(q:any, cd:any, ChildIndex:any):any;
	SampleFromHeightMap(cd:any, hm:any):any;
	AddHeightMap(cd:any, hm:any):any;
	GetQuadSquareChunk(cd:any, error:any, targetChunkLevel?:any):any;
	RecomputeErrorAndLighting(cd:any):any;


}

}

export default altern.terrain.QuadSquare;