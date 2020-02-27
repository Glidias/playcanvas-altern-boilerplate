import altern_collisions_CollisionBoundNode from "../../altern/collisions/CollisionBoundNode";
import altern_geom_Face from "./../../altern/geom/Face";
import altern_culling_DefaultCulling from "./../../altern/culling/DefaultCulling";
import js_Boot from "./../../js/Boot";
import altern_culling_IFrustumCollectTri from "./../../altern/culling/IFrustumCollectTri";
import altern_culling_CullingPlane from "./../../altern/culling/CullingPlane";
import jeash_geom_Vector3D from "./../../jeash/geom/Vector3D";
import altern_geom_ClipMacros from "./../../altern/geom/ClipMacros";
import components_Transform3D from "./../../components/Transform3D";
import util_geom_Vec3 from "./../../util/geom/Vec3";

declare namespace altern.culling {

class TargetBoardTester {
constructor();
yLockedNearClip: boolean;
planeOrientedFarclip: boolean;
nearClip: number;
setObserverPosition(x: number, y: number, z: number): void;
setObserverPriority(priority: number): void;
setupTargetBoard(pos: util_geom_Vec3, up: util_geom_Vec3, right: util_geom_Vec3, sx: number, sz: number, testBoundNode: altern_collisions_CollisionBoundNode, customDisposableFace?: altern_geom_Face): number;
setupNewFrustum(): altern_culling_CullingPlane;
createFrustumFromPoints(pts: jeash_geom_Vector3D[], targPos: util_geom_Vec3, nearClipPt: jeash_geom_Vector3D): void;
disposeGetTotalArea(faceList: altern_geom_Face): number;
static readonly PRIORITY_CONCEALMENT: number;
static readonly PRIORITY_COVER: number;

}

}

export default altern.culling.TargetBoardTester;