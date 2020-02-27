import jeash_geom_Vector3D from "../../jeash/geom/Vector3D";
import util_geom_XYZW from "./../../util/geom/XYZW";

declare namespace jeash.geom {

class Vector3D implements util_geom_XYZW {
constructor(x: number, y?: number, z?: number, w?: number);
get_length(): number;
get_lengthSquared(): number;
w: number;
x: number;
y: number;
z: number;
add(a: jeash_geom_Vector3D): jeash_geom_Vector3D;
clone(): jeash_geom_Vector3D;
crossProduct(a: jeash_geom_Vector3D): jeash_geom_Vector3D;
decrementBy(a: jeash_geom_Vector3D): void;
dotProduct(a: jeash_geom_Vector3D): number;
equals(toCompare: jeash_geom_Vector3D, allFour?: boolean): boolean;
incrementBy(a: jeash_geom_Vector3D): void;
nearEquals(toCompare: jeash_geom_Vector3D, tolerance: number, allFour?: boolean): boolean;
negate(): void;
normalize(): number;
project(): void;
scaleBy(s: number): void;
subtract(a: jeash_geom_Vector3D): jeash_geom_Vector3D;
toString(): string;
static angleBetween(a: jeash_geom_Vector3D, b: jeash_geom_Vector3D): number;
static distance(pt1: jeash_geom_Vector3D, pt2: jeash_geom_Vector3D): number;
static get_X_AXIS(): jeash_geom_Vector3D;
static get_Y_AXIS(): jeash_geom_Vector3D;
static get_Z_AXIS(): jeash_geom_Vector3D;

}

}

export default jeash.geom.Vector3D;