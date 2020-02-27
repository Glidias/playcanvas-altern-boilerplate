import components_BoundBox from "../../components/BoundBox";
import util_geom_Vec3 from "../../util/geom/Vec3";
import components_Transform3D from "../../components/Transform3D";
import jeash_geom_Vector3D from "../../jeash/geom/Vector3D";
import jeash_geom_Rectangle from "./../../jeash/geom/Rectangle";
import Std from "./../../Std";

declare namespace util.geom {

class AABBUtils {
protected constructor();
static readonly MAX_VALUE: number;
static readonly THRESHOLD: number;
static getRect(aabb: components_BoundBox, threshold?: number): jeash_geom_Rectangle;
static clampMagnitude(mag: number, threshold?: number): number;
static getString(aabb: components_BoundBox): string;
static pointInside(aabb: components_BoundBox, pt: util_geom_Vec3): boolean;
static intersectsEachOther(a: components_BoundBox, b: components_BoundBox): boolean;
static intersectsBoundValues(a: components_BoundBox, minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): boolean;
static transform(aabb: components_BoundBox, t: components_Transform3D): void;
static match(aabb: components_BoundBox, refAABB: components_BoundBox): void;
static setToMax(aabb: components_BoundBox): void;
static reset(aabb: components_BoundBox): void;
static expand2(aabb: components_BoundBox, refAABB: components_BoundBox): void;
static expand(x: number, y: number, z: number, aabb: components_BoundBox): void;
static expandWithPoint(vec: util_geom_Vec3, aabb: components_BoundBox): void;
static checkSphere(aabb: components_BoundBox, sphere: jeash_geom_Vector3D): boolean;
static intersectRay(aabb: components_BoundBox, origin: jeash_geom_Vector3D, direction: jeash_geom_Vector3D): boolean;

}

}

export default util.geom.AABBUtils;