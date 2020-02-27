import altern_collisions_dbvt_DBVTNode from "../../../altern/collisions/dbvt/DBVTNode";
import components_BoundBox from "../../../components/BoundBox";
import altern_collisions_dbvt_DBVTProxy from "./../../../altern/collisions/dbvt/DBVTProxy";
import js_Boot from "./../../../js/Boot";
import systems_collisions_ITCollidable from "./../../../systems/collisions/ITCollidable";
import altern_ray_IRaycastImpl from "./../../../altern/ray/IRaycastImpl";
import components_Transform3D from "./../../../components/Transform3D";
import altern_collisions_dbvt__$AbstractAABB_AbstractAABB_$Impl_$ from "./../../../altern/collisions/dbvt/_AbstractAABB/AbstractAABB_Impl_";

declare namespace altern.collisions.dbvt {

class DBVTNode {
constructor();
child1: altern_collisions_dbvt_DBVTNode;
child2: altern_collisions_dbvt_DBVTNode;
parent: altern_collisions_dbvt_DBVTNode;
proxy: altern_collisions_dbvt_DBVTProxy;
height: number;
aabb: components_BoundBox;
static createFrom(obj: any, aabb: components_BoundBox, transform?: components_Transform3D): altern_collisions_dbvt_DBVTNode;

}

}

export default altern.collisions.dbvt.DBVTNode;