import systems_collisions_EllipsoidCollider from "../../systems/collisions/EllipsoidCollider";
import components_Transform3D from "../../components/Transform3D";


declare namespace systems.collisions {

interface ITCollidable {
collectGeometryAndTransforms(collider: systems_collisions_EllipsoidCollider, baseTransform: components_Transform3D): void;

}

}

export default ITCollidable;