import systems_collisions_EllipsoidCollider from "../../../systems/collisions/EllipsoidCollider";
import components_Transform3D from "../../../components/Transform3D";
import altern_ray_IRaycastImpl from "./../../../altern/ray/IRaycastImpl";
import systems_collisions_ITCollidable from "./../../../systems/collisions/ITCollidable";
import altern_collisions_dbvt_DBVTNode from "./../../../altern/collisions/dbvt/DBVTNode";
import util_geom_GeomUtil from "./../../../util/geom/GeomUtil";
import jeash_geom_Vector3D from "./../../../jeash/geom/Vector3D";
import altern_collisions_dbvt__$AbstractAABB_AbstractAABB_$Impl_$ from "./../../../altern/collisions/dbvt/_AbstractAABB/AbstractAABB_Impl_";

declare namespace altern.collisions.dbvt {

class DBVT implements altern_ray_IRaycastImpl, systems_collisions_ITCollidable {
constructor();
root: altern_collisions_dbvt_DBVTNode;
purge(): void;
moveLeaf(leaf: altern_collisions_dbvt_DBVTNode): void;
insertLeaf(leaf: altern_collisions_dbvt_DBVTNode): void;
getBalance(node: altern_collisions_dbvt_DBVTNode): number;
deleteLeaf(leaf: altern_collisions_dbvt_DBVTNode): void;
collectGeometryAndTransforms(collider: systems_collisions_EllipsoidCollider, baseTransform: components_Transform3D): void;
intersectRay(origin: jeash_geom_Vector3D, direction: jeash_geom_Vector3D, output: jeash_geom_Vector3D): jeash_geom_Vector3D;

}

}

export default altern.collisions.dbvt.DBVT;