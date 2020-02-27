import js__$Boot_HaxeError from "./../../js/_Boot/HaxeError";
import altern_terrain_QuadChunkCornerData from "./../../altern/terrain/QuadChunkCornerData";

declare namespace altern.terrain {

export class QuadSquareChunk {

	constructor();
	Child:any;
	error:any;
	MinY:any;
	MaxY:any;
	EnabledFlags:any;
	
	state:any;
	destroy():any;
	SetupCornerData(q:any, cd:any, ChildIndex:any):any;
	CountNodes():any;
	GetNeighbor(dir:any, cd:any):any;
	EnableEdgeVertex(index:any, IncrementCount:any, cd:any):any;
	getNeighborCornerData(pcd:any, dir:any):any;
	EnableDescendant(count:any, path:any, cd:any):any;
	EnableChild(index:any, cd:any):any;
	NotifyChildDisable(cd:any, index:any):any;
	ResetTree():any;
	BoxTest(x:any, z:any, size:any, miny:any, maxy:any, error:any, camera:any):any;
	Update(cd:any, camera:any, Detail:any, culler:any, culling:any):any;
	UpdateAux(cd:any, camera:any, CenterError:any, culler:any, culling:any):any;
	static BlockUpdateCount:any;
	static DetailThreshold:any;
	static QUADTREE_GRID:any;
	static LOD_LVL_MIN:any;
	


}

}

export default altern.terrain.QuadSquareChunk;