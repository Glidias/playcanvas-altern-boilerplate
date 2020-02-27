import altern_collisions_CollisionBoundNode from "../../altern/collisions/CollisionBoundNode";
import systems_collisions_ITCollidable from "../../systems/collisions/ITCollidable";
import components_BoundBox from "../../components/BoundBox";
import systems_collisions_EllipsoidCollider from "../../systems/collisions/EllipsoidCollider";
import systems_collisions_IECollidable from "./../../systems/collisions/IECollidable";
import components_Transform3D from "./../../components/Transform3D";
import jeash_geom_Vector3D from "./../../jeash/geom/Vector3D";
import util_geom_AABBUtils from "./../../util/geom/AABBUtils";
import js__$Boot_HaxeError from "./../../js/_Boot/HaxeError";
import js_Boot from "./../../js/Boot";
import altern_ray_IRaycastImpl from "./../../altern/ray/IRaycastImpl";

declare namespace altern.collisions {

class CollisionBoundNode implements systems_collisions_IECollidable {
protected constructor();
childrenList: altern_collisions_CollisionBoundNode;
next: altern_collisions_CollisionBoundNode;
_parent: altern_collisions_CollisionBoundNode;
transform: components_Transform3D;
inverseTransform: components_Transform3D;
localToGlobalTransform: components_Transform3D;
globalToLocalTransform: components_Transform3D;
calculateLocalGlobalTransforms(): void;
collidable: systems_collisions_ITCollidable;
raycastable: altern_ray_IRaycastImpl;
boundBox: components_BoundBox;
localToWorldTransform: components_Transform3D;
worldToLocalTransform: components_Transform3D;
calculateLocalWorldTransforms(): void;
mirrorClone(): altern_collisions_CollisionBoundNode;
updateTransform(refTransform: components_Transform3D): void;
collectGeometry(collider: systems_collisions_EllipsoidCollider): void;
intersectRay(origin: jeash_geom_Vector3D, direction: jeash_geom_Vector3D, output: jeash_geom_Vector3D): jeash_geom_Vector3D;
addChild(child: altern_collisions_CollisionBoundNode): altern_collisions_CollisionBoundNode;
removeChild(child: altern_collisions_CollisionBoundNode): altern_collisions_CollisionBoundNode;
static calculateLocalToGlobal2(obj: altern_collisions_CollisionBoundNode, trm?: components_Transform3D): components_Transform3D;
static calculateGlobalToLocal2(obj: altern_collisions_CollisionBoundNode, trm?: components_Transform3D): components_Transform3D;
static create(transform: components_Transform3D, inverseTransform?: components_Transform3D): altern_collisions_CollisionBoundNode;
static createNew(transform: components_Transform3D, inverseTransform?: components_Transform3D, collidable?: systems_collisions_ITCollidable, raycastable?: altern_ray_IRaycastImpl): altern_collisions_CollisionBoundNode;

}

}

export default altern.collisions.CollisionBoundNode;