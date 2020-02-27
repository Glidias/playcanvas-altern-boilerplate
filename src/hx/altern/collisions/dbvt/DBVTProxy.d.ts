import altern_ray_IRaycastImpl from "../../../altern/ray/IRaycastImpl";
import systems_collisions_ITCollidable from "../../../systems/collisions/ITCollidable";
import components_Transform3D from "../../../components/Transform3D";


declare namespace altern.collisions.dbvt {

class DBVTProxy {
constructor();
raycastable: altern_ray_IRaycastImpl;
collidable: systems_collisions_ITCollidable;
transform: components_Transform3D;
inverseTransform: components_Transform3D;
localToGlobalTransform: components_Transform3D;
globalToLocalTransform: components_Transform3D;

}

}

export default altern.collisions.dbvt.DBVTProxy;