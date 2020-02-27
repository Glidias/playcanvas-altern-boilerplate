import altern_culling_CullingPlane from "../../altern/culling/CullingPlane";
import jeash_geom_Vector3D from "../../jeash/geom/Vector3D";
import altern_terrain_ICuller from "./../../altern/terrain/ICuller";
import altern_geom_Face from "./../../altern/geom/Face";
import altern_geom_Wrapper from "./../../altern/geom/Wrapper";
import altern_geom_Vertex from "./../../altern/geom/Vertex";
import util_geom_Vec3 from "./../../util/geom/Vec3";
import altern_geom_ClipMacros from "./../../altern/geom/ClipMacros";

declare namespace altern.culling {

class DefaultCulling implements altern_terrain_ICuller {
constructor();
frustum: altern_culling_CullingPlane;
cullingInFrustum(culling: number, minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): number;
static cullingInFrustumOf(frustum: altern_culling_CullingPlane, culling: number, minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): number;
static isInFrontOfFrustum(ax: number, ay: number, az: number, bx: number, by: number, bz: number, cx: number, cy: number, cz: number, frustumCorners: jeash_geom_Vector3D[]): boolean;
static clippedFace: altern_geom_Face;
static collectClippedFace(): void;
static clippedFace2: altern_geom_Face;
static collectClippedFace2(): void;
static CLIP_NEAR: boolean;
static triInFrustumCover(frustum: altern_culling_CullingPlane, ax: number, ay: number, az: number, bx: number, by: number, bz: number, cx: number, cy: number, cz: number): number;
static pointInFrustum(frustum: altern_culling_CullingPlane, x: number, y: number, z: number): boolean;

}

}

export default altern.culling.DefaultCulling;