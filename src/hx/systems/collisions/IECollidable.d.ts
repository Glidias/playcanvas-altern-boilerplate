import systems_collisions_EllipsoidCollider from "../../systems/collisions/EllipsoidCollider";


declare namespace systems.collisions {

interface IECollidable {
collectGeometry(collider: systems_collisions_EllipsoidCollider): void;

}

}

export default IECollidable;