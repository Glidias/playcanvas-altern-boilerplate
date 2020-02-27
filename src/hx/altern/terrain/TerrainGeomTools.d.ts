import util_geom_Geometry from "./../../util/geom/Geometry";
import altern_terrain_GeometryResult from "./../../altern/terrain/GeometryResult";

declare namespace altern.terrain {

export class TerrainGeomTools {

	static NORTH_EAST:any;
	static NORTH_WEST:any;
	static SOUTH_WEST:any;
	static SOUTH_EAST:any;
	static MASK_EAST:any;
	static MASK_NORTH:any;
	static MASK_WEST:any;
	static MASK_SOUTH:any;
	static TERRAIN:any;
	static createLODTerrainChunkForMesh(patchesAcross?:any, patchSize?:any):any;
	static writeVertices(vertices:any, x:any, y:any, patchSize:any, segUVSize:any, offsetAdditionalData:any):any;
	static createFace(indices:any, vertices:any, a:any, b:any, c:any, d:any, nx:any, ny:any, nz:any, tx:any, ty:any, tz:any, tw:any, reverse:any):any;
	static writeInnerIndicesToByteArray(patchesAcross:any, vIndexLookup:any, indices:any, addInnerPadding?:any):any;
	static writeEdgeVerticesToByteArray(patchesAcross:any, vIndexLookup:any, indices:any, edgeMask:any):any;
	static writeRegularQuad(x:any, y:any, vAcross:any, indices:any, vIndexLookup:any):any;
	static writeConditionalQuad(x:any, y:any, vAcross:any, indices:any, vIndexLookup:any, disabledEdgeVertices:any):any;


}

}

export default altern.terrain.TerrainGeomTools;