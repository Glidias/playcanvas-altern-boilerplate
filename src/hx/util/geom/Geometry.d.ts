import systems_collisions_EllipsoidCollider from "../../systems/collisions/EllipsoidCollider";
import altern_culling_CullingPlane from "../../altern/culling/CullingPlane";
import altern_culling_IFrustumCollectTri from "./../../altern/culling/IFrustumCollectTri";
import altern_ray_IRaycastImpl from "./../../altern/ray/IRaycastImpl";
import util_geom_ITECollidable from "./../../util/geom/ITECollidable";
import altern_culling_DefaultCulling from "./../../altern/culling/DefaultCulling";
import altern_geom_Face from "./../../altern/geom/Face";
import components_Transform3D from "./../../components/Transform3D";
import jeash_geom_Vector3D from "./../../jeash/geom/Vector3D";

declare namespace util.geom {

class Geometry implements altern_culling_IFrustumCollectTri, altern_ray_IRaycastImpl, util_geom_ITECollidable {
constructor();
vertices: number[];
indices: number[];
numVertices: number;
numIndices: number;
setVertices(val: number[]): void;
setIndices(val: number[]): void;
collectGeometry(collider: systems_collisions_EllipsoidCollider): void;
collectGeometryAndTransforms(collider: systems_collisions_EllipsoidCollider, baseTransform: components_Transform3D): void;
intersectRay(origin: jeash_geom_Vector3D, direction: jeash_geom_Vector3D, res: jeash_geom_Vector3D): jeash_geom_Vector3D;
collectTrisForFrustum(frustum: altern_culling_CullingPlane, culling: number, frustumCorners: jeash_geom_Vector3D[], vertices: number[], indices: number[]): void;
static IDENTITY: components_Transform3D;

}

}

export default util.geom.Geometry;