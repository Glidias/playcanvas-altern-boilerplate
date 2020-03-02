import systems_collisions_IECollidable from "../../systems/collisions/IECollidable";
import util_geom_Geometry from "../../util/geom/Geometry";
import jeash_geom_Vector3D from "./../../jeash/geom/Vector3D";
import systems_collisions_CollisionEvent from "./../../systems/collisions/CollisionEvent";
import components_Transform3D from "./../../components/Transform3D";

declare namespace systems.collisions {

class EllipsoidCollider {
constructor(radiusX: number, radiusY: number, radiusZ: number, threshold?: number, requireEvents?: boolean);
radiusX: number;
radiusY: number;
radiusZ: number;
threshold: number;
matrix: components_Transform3D;
inverseMatrix: components_Transform3D;
vertices: number[];
normals: number[];
indices: number[];
readonly numFaces: number;
readonly numI: number;
sphere: jeash_geom_Vector3D;
timestamp: number;
collisions: systems_collisions_CollisionEvent;
purge(): void;
static purgeBuffers():any;
calculateSphere(transform: components_Transform3D): void;
calculateCollidableGeometry(source: jeash_geom_Vector3D, collidable: systems_collisions_IECollidable): void;
addGeometry(geometry: util_geom_Geometry, transform: components_Transform3D): void;
calculateDestination(source: jeash_geom_Vector3D, displacement: jeash_geom_Vector3D, collidable: systems_collisions_IECollidable, timeFrame?: number, fromTime?: number): jeash_geom_Vector3D;
getCollision(source: jeash_geom_Vector3D, displacement: jeash_geom_Vector3D, resCollisionPoint: jeash_geom_Vector3D, resCollisionPlane: jeash_geom_Vector3D, collidable: systems_collisions_IECollidable): boolean;

}

}

export default systems.collisions.EllipsoidCollider;