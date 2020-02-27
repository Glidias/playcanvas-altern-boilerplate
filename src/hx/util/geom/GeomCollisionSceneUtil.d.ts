import altern_collisions_CollisionBoundNode from "../../altern/collisions/CollisionBoundNode";
import components_Transform3D from "./../../components/Transform3D";
import components_BoundBox from "./../../components/BoundBox";
import js__$Boot_HaxeError from "./../../js/_Boot/HaxeError";

declare namespace util.geom {

class GeomCollisionSceneUtil {
protected constructor();
static calculateHierarchyBoundBox(object: altern_collisions_CollisionBoundNode, boundBoxSpace?: altern_collisions_CollisionBoundNode, result?: components_BoundBox): components_BoundBox;
static transformBounds(bounds: components_BoundBox, t: components_Transform3D): void;
static updateBounds(boundBox: components_BoundBox, tBounds: components_BoundBox): void;

}

}

export default util.geom.GeomCollisionSceneUtil;