import util_geom_Vec3 from "../../util/geom/Vec3";
import util_geom_Mat3 from "../../util/geom/Mat3";
import util_geom_Mat4 from "../../util/geom/Mat4";


declare namespace util.geom {

class Vec3 {
constructor(x: number, y?: number, z?: number);
x: number;
y: number;
z: number;
length(): number;
lengthSqr(): number;
dotProduct(v: util_geom_Vec3): number;
crossProduct(v: util_geom_Vec3): util_geom_Vec3;
clone(): util_geom_Vec3;
isZeroVector(): boolean;
crossProductSet(v: util_geom_Vec3): void;
add(v: util_geom_Vec3): void;
addScaled(k: number, v: util_geom_Vec3): void;
subtract(v: util_geom_Vec3): void;
sum(a: util_geom_Vec3, b: util_geom_Vec3): void;
diff(a: util_geom_Vec3, b: util_geom_Vec3): void;
scale(k: number): void;
reverse(): void;
transform3(m: util_geom_Mat3): void;
transformTransposed3(m: util_geom_Mat3): void;
reset(): void;
set(param1: number, param2: number, param3: number): void;
saveTo(result: util_geom_Vec3): void;
copyFrom(source: util_geom_Vec3): void;
transform4(m: util_geom_Mat4): void;
transformTransposed4(m: util_geom_Mat4): void;
transformVector4(m: util_geom_Mat4): void;
assignAddition(v1: util_geom_Vec3, v2: util_geom_Vec3): void;
normalize(): void;
setLength(val: number): void;
removeComponent(axis: util_geom_Vec3): void;
distanceTo(v: util_geom_Vec3): number;
toString(): string;
static ZERO: util_geom_Vec3;
static X_AXIS: util_geom_Vec3;
static Y_AXIS: util_geom_Vec3;
static Z_AXIS: util_geom_Vec3;
static RIGHT: util_geom_Vec3;
static LEFT: util_geom_Vec3;
static FORWARD: util_geom_Vec3;
static BACK: util_geom_Vec3;
static UP: util_geom_Vec3;
static DOWN: util_geom_Vec3;
static copy(v: util_geom_Vec3): util_geom_Vec3;
static createCross(v1: util_geom_Vec3, v2: util_geom_Vec3): util_geom_Vec3;
static createAdd(v1: util_geom_Vec3, v2: util_geom_Vec3): util_geom_Vec3;
static createSubtract(v1: util_geom_Vec3, v2: util_geom_Vec3): util_geom_Vec3;
static createScale(v: util_geom_Vec3, scaleAmt: any): util_geom_Vec3;
static createProjection(v: util_geom_Vec3, axis: util_geom_Vec3): util_geom_Vec3;
static dot(v1: util_geom_Vec3, v2: util_geom_Vec3): number;
static lengthOf(v: util_geom_Vec3): number;
static squareLengthOf(v: util_geom_Vec3): number;
static writeCross(v1: util_geom_Vec3, v2: util_geom_Vec3, output: util_geom_Vec3): void;
static writeProjection(v: util_geom_Vec3, axis: util_geom_Vec3, output: util_geom_Vec3): void;
static writeSubtract(output: util_geom_Vec3, input: util_geom_Vec3): void;
static writeAdd(output: util_geom_Vec3, input: util_geom_Vec3): void;
static writeScale(output: util_geom_Vec3, scaleAmt: number): void;

}

}

export default util.geom.Vec3;