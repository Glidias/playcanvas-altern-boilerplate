import bvhtree_BVH from "../../../bvhtree/BVH";
import components_BoundBox from "../../../components/BoundBox";
import systems_collisions_EllipsoidCollider from "../../../systems/collisions/EllipsoidCollider";
import components_Transform3D from "../../../components/Transform3D";
import altern_culling_CullingPlane from "../../../altern/culling/CullingPlane";
import altern_culling_IFrustumCollectTri from "./../../../altern/culling/IFrustumCollectTri";
import altern_ray_IRaycastImpl from "./../../../altern/ray/IRaycastImpl";
import systems_collisions_ITCollidable from "./../../../systems/collisions/ITCollidable";
import altern_culling_DefaultCulling from "./../../../altern/culling/DefaultCulling";
import altern_geom_Face from "./../../../altern/geom/Face";
import util_geom_Geometry from "./../../../util/geom/Geometry";
import jeash_geom_Vector3D from "./../../../jeash/geom/Vector3D";

declare namespace altern.partition.js {

class BVHTree implements altern_culling_IFrustumCollectTri, altern_ray_IRaycastImpl, systems_collisions_ITCollidable {
constructor(bvh: bvhtree_BVH);
setBufferAlloc(amt: number): void;
collectGeometryFromAABB(aabb: components_BoundBox): util_geom_Geometry;
collectGeometryAndTransforms(collider: systems_collisions_EllipsoidCollider, baseTransform: components_Transform3D): void;
purge(): void;
intersectRay(origin: jeash_geom_Vector3D, direction: jeash_geom_Vector3D, output: jeash_geom_Vector3D): jeash_geom_Vector3D;
collectTrisForFrustum(frustum: altern_culling_CullingPlane, culling: number, frustumCorners: jeash_geom_Vector3D[], vertices: number[], indices: number[]): void;

}

}

export default altern.partition.js.BVHTree;