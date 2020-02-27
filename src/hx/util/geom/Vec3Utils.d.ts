import jeash_geom_Vector3D from "../../jeash/geom/Vector3D";
import util_geom_Vec3 from "./../../util/geom/Vec3";

declare namespace util.geom {

class Vec3Utils {
protected constructor();
static copy(v: util_geom_Vec3): util_geom_Vec3;
static createCross(v1: util_geom_Vec3, v2: util_geom_Vec3): util_geom_Vec3;
static createAdd(v1: util_geom_Vec3, v2: util_geom_Vec3): util_geom_Vec3;
static createSubtract(v1: util_geom_Vec3, v2: util_geom_Vec3): util_geom_Vec3;
static createScale(v: util_geom_Vec3, scaleAmt: number): util_geom_Vec3;
static createProjection(v: util_geom_Vec3, axis: util_geom_Vec3): util_geom_Vec3;
static matchValues(output: util_geom_Vec3, withValue: util_geom_Vec3): void;
static matchValuesVector3D(output: util_geom_Vec3, withValue: jeash_geom_Vector3D): void;
static dot(v1: util_geom_Vec3, v2: util_geom_Vec3): number;
static writeCross(v1: util_geom_Vec3, v2: util_geom_Vec3, output: util_geom_Vec3): void;
static writeProjection(v: util_geom_Vec3, axis: util_geom_Vec3, output: util_geom_Vec3): void;
static normalize(v: util_geom_Vec3): void;
static subtract(output: util_geom_Vec3, input: util_geom_Vec3): void;
static add(output: util_geom_Vec3, input: util_geom_Vec3): void;
static scale(output: util_geom_Vec3, scaleAmt: number): void;
static writeSubtract(output: util_geom_Vec3, v1: util_geom_Vec3, v2: util_geom_Vec3): void;
static getLength(v: util_geom_Vec3): number;
static sqDistBetween(a: util_geom_Vec3, b: util_geom_Vec3): number;
static sqDist2DBetween(a: util_geom_Vec3, b: util_geom_Vec3): number;
static distBetween(a: util_geom_Vec3, b: util_geom_Vec3): number;

}

}

export default util.geom.Vec3Utils;