import altern_terrain_HeightMapInfo from "../../altern/terrain/HeightMapInfo";
import util_geom_Vec3 from "../../util/geom/Vec3";
import altern_terrain_GeometryResult from "../../altern/terrain/GeometryResult";
import altern_ray_IRaycastImpl from "./../../altern/ray/IRaycastImpl";
import altern_terrain_ICuller from "./../../altern/terrain/ICuller";
import altern_terrain_NoCulling from "./../../altern/terrain/NoCulling";
import altern_terrain_WaterClipCulling from "./../../altern/terrain/WaterClipCulling";
import altern_terrain_TerrainGeomTools from "./../../altern/terrain/TerrainGeomTools";
import js__$Boot_HaxeError from "./../../js/_Boot/HaxeError";
import altern_terrain_TerrainChunkState from "./../../altern/terrain/TerrainChunkState";
import altern_terrain_QuadTreePage from "./../../altern/terrain/QuadTreePage";
import altern_terrain_QuadChunkCornerData from "./../../altern/terrain/QuadChunkCornerData";
import altern_terrain_QuadSquareChunk from "./../../altern/terrain/QuadSquareChunk";
import jeash_geom_Vector3D from "./../../jeash/geom/Vector3D";
import altern_terrain_QuadCornerData from "./../../altern/terrain/QuadCornerData";
import altern_terrain_TerrainChunkStateList from "./../../altern/terrain/TerrainChunkStateList";

declare namespace altern.terrain {

class TerrainLOD implements altern_ray_IRaycastImpl, altern_terrain_ICuller {
constructor();
newly_instantiated: number;
pool_retrieved: number;
cached_retrieved: number;
handedness: number;
gridPagesVector: altern_terrain_QuadTreePage[];
tree: altern_terrain_QuadTreePage;
detail: number;
setDetail(val: number): void;
setupUpdateCullingMode(mode: number): void;
waterLevel: number;
setUpdateRadius(val: number): void;
loadSinglePage(page: altern_terrain_QuadTreePage, uvTileSize?: number, requirements?: number, tileSize?: number): void;
runSinglePage(heightMap: altern_terrain_HeightMapInfo, quadCornerChunk: altern_terrain_QuadTreePage, requirements: number, uvTileSize?: number, tileSize?: number): void;
collectDraws(camera: util_geom_Vec3): void;
cullingInFrustum(culling: number, minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): number;
intersectRay(origin: jeash_geom_Vector3D, direction: jeash_geom_Vector3D, result: jeash_geom_Vector3D): jeash_geom_Vector3D;
numCollisionTriangles: number;
setupCollisionGeometry(sphere: jeash_geom_Vector3D, vertices: number[], indices: number[], vi?: number, ii?: number): void;
calcBoundIntersection(point: jeash_geom_Vector3D, origin: jeash_geom_Vector3D, direction: jeash_geom_Vector3D, minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): number;
static readonly PATCHES_ACROSS: number;
static readonly NUM_VERTICES: number;
static readonly PATCHES_SHIFT: number;
static readonly UV_STEPWISE: number;
static readonly UV_NORMALIZED: number;
static PROTO_32: altern_terrain_GeometryResult;
static readonly CULL_NONE: number;
static readonly CULL_WATER: number;
static readonly CULL_FULL: number;
static installQuadTreePageHeightmap(heightMap: altern_terrain_HeightMapInfo, offsetX?: number, offsetY?: number, tileSize?: number, sampleSize?: number): altern_terrain_QuadTreePage;

}

}

export default altern.terrain.TerrainLOD;