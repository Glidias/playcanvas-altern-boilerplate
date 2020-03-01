import { OBB } from "../../../yuka/src/math/OBB";
import { Quaternion } from "../../../yuka/src/math/Quaternion";

var INSTANCE: OBB;
var QUAT: Quaternion = new Quaternion();

export function getOBBInstance() {
    return INSTANCE || (INSTANCE= new OBB());
}

export function setupOBBFromAABBAndRotation(obb:OBB, myAABB: pc.BoundingBox, myRotation: pc.Quat) {
    obb.center.set(myAABB.center.x, myAABB.center.y, myAABB.center.z);
    QUAT.set(myRotation.x, myRotation.y, myRotation.z, myRotation.w);
    obb.rotation.fromQuaternion(QUAT);
    let halfExtents = myAABB.halfExtents;
    obb.halfSizes.set(halfExtents.x, halfExtents.y, halfExtents.z);
    return obb;
}

